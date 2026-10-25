---
title: "How to Switch to a Cheaper LLM Without Breaking Your Product: A Practical Eval Playbook"
excerpt: Moving from an expensive model to a cheaper one is not a migration. It is a bet. Here is how we made that bet systematic, so the product survived and the costs dropped.
date: 2026-10-26
tags: [AI/LLM, Product Strategy, Engineering, Cost Optimization]
cover: ./cover.webp
coverAlt: A close-up of code on a laptop screen showing API configurations
coverCredit: Kevin Ku · CC0
coverCreditUrl: https://www.pexels.com/photo/coding-on-laptop-577585/
summary:
  - "It seems fine" is not proof. It is hope wearing a lab coat.
  - A golden test set is the only anchor when everything else is opinions.
  - Metrics should match what the business actually cares about, not what sounds impressive in a meeting.
  - Shadow testing lets you fail quietly before customers notice.
  - Rollout guardrails are how you sleep at night after shipping.
---

Three months ago, someone asked me if we could swap out the expensive model for a cheaper one.

I said yes. Then I sat at my desk for twenty minutes trying to figure out what yes actually meant.

The feature was working. Customers were using it. The model was expensive enough that every API call mattered. A cheaper option existed, and on paper it looked close enough. But "close enough" is not a deployment strategy. It is a resignation letter written in advance.

This is the piece I wish I had read before that conversation. Not the theory. The work. What to build, what to check, and what to watch for when the cheaper model goes live and you are the one who said it would be fine.

## Why "it seems fine" is not proof

Let me start with the thing that almost killed us.

We swapped in the cheaper model. Ran it on a few test prompts. The responses looked reasonable. Same structure. Same tone. Close enough answers. We nodded at each other in Slack and called it validated.

Two weeks later, a customer support ticket came in. The feature was giving confident answers to questions it should have declined. Not hallucinating. Worse. Saying "yes, we can do that" when the actual answer was "no, this is not supported."

![A person looking stressed while working on a laptop at night](./stress.webp "When the cheaper model starts saying yes to everything, and you realize validation was three test cases in a Slack thread. | Photo: Elisa Ventur · CC0")

The expensive model had been cautious. It knew its limits. The cheaper one was eager to please. In our quick check, that looked like good performance. In production, it looked like broken promises.

"It seems fine" is not proof. It is hope wearing a lab coat.

Here is what proof actually looks like.

## Building a golden test set

A golden test set is not every possible input. It is the inputs that matter.

When we started building ours, we wanted to be thorough. We listed hundreds of cases. Edge cases. Rare queries. Everything we could imagine going wrong. The spreadsheet grew to 400 rows. Nobody ever ran all 400.

The useful test set we ended up with had 80 examples. That was it.

Here is how we got there.

### Start with real production data

Go into your logs. Pull the last 1,000 API calls. Not the ones you wrote during development. The ones customers actually sent.

You will see patterns. The same handful of intents showing up over and over. A few edge cases that happen more often than you expected. Prompts that are messier than anything you tested internally.

Pick 50 of those. The most common intents. The messiest inputs. The cases that made your API return an error or a retry.

### Add known failure modes

Think back to every bug, every support ticket, every "wait, it did what?" moment since you shipped.

Each of those is a test case. Write them down. The exact input that caused the problem. The expected output. Why it matters.

We had a case where a customer name with an apostrophe broke the output formatting. Rare. But once you have seen it, you cannot unsee it. That went into the test set.

### Include business-critical scenarios

This is the part most eng-heavy teams skip.

Talk to the people who sell the product. Ask them what the top three promises are in the sales deck. Turn those into test cases.

If the deck says "handles regional accents," your test set needs examples of regional accents. If it says "works for enterprises with complex hierarchies," you need test cases with complex hierarchies.

These are not the cases that break the code. They are the cases that break the contract with the customer.

![A checklist on a clipboard with checkmarks](./checklist.webp "A golden test set is not 400 edge cases nobody runs. It is 80 cases someone checks before every deployment. | Photo: Glenn Carstens-Peters · CC0")

By the end, you have maybe 80 examples. Enough to catch the things that matter. Small enough that you will actually run it.

Save it in a shared doc. Version it. This is your ground truth. Everything else is a guess.

## Picking metrics that match what the business cares about

Here is a mistake I see constantly. Teams evaluate LLMs using the metrics that LLM papers use.

BLEU score. Perplexity. F1. Precision. Recall.

Those are fine if you are publishing a paper. They are useless if you are trying to decide whether the cheaper model will wreck your customer experience.

The metrics that matter are the ones your business actually cares about. And your business does not care about BLEU score.

### Ask: what makes this feature valuable?

For us, the feature was summarizing long conversations. What made it valuable was saving people time while keeping the summary accurate enough that they could act on it.

So the metrics we tracked were:
- **Accuracy:** Does the summary include all key decisions?
- **Precision:** Does it skip the irrelevant small talk?
- **Actionability:** Can someone who did not hear the call understand what to do next?

We scored each test case on a 1-5 scale for each dimension. Not perfect. But grounded in what the product was supposed to do.

### Build a scoring rubric

A rubric is how you turn "this feels right" into "this is a 4 out of 5."

For each dimension, write down what a 1 looks like. What a 3 looks like. What a 5 looks like. Be specific.

Example:

**Actionability**
- **1:** Summary is too vague to act on. Missing next steps entirely.
- **3:** Summary mentions next steps but is unclear about ownership or timing.
- **5:** Summary lists next steps with clear owners and deadlines.

This is boring work. Do it anyway. It is the only way you will know if the cheaper model is actually cheaper, or just cheaper until you count the support tickets.

![A notebook with handwritten notes and a pen](./notes.webp "The rubric that keeps the team honest when someone says the new model is 'basically the same.' | Photo: Unsplash · CC0")

### Run both models through the same test set

Take your 80 golden examples. Run them through the expensive model. Score each response using your rubric.

Then run the same 80 through the cheaper model. Score those too.

Now you have numbers. Not vibes. Not "it seems fine." Actual scores.

If the cheaper model is within 10% on the metrics that matter, you have a case. If it is 30% worse on accuracy, you have a different conversation.

## Shadow testing the cheaper setup

Shadow testing is how you fail quietly before customers notice.

Here is the idea. The expensive model is still live. Customers are still hitting it. But in the background, you are also running the cheaper model on every request. You log both responses. You compare them. Nobody sees the cheap one yet.

This is not a staging environment test. This is production traffic. Real customer inputs. Real edge cases. Real messiness.

### Instrumentation is everything

You need to log:
- The input prompt
- The response from the expensive model
- The response from the cheaper model
- The scores for both, using your rubric
- Latency for both
- Any errors or retries

If you are not logging all of this, you are shadow testing in name only.

We ran shadow tests for two weeks. 10,000 requests. That is when we found the "eager to please" problem I mentioned earlier. The cheaper model scored higher on "helpfulness" but lower on "accuracy." It was giving more confident answers, but some of them were wrong.

In shadow mode, that was a log entry. If we had shipped it directly, it would have been a customer escalation.

![A dashboard showing graphs and metrics](./dashboard.webp "Shadow testing is not optional. It is the difference between 'we think it works' and 'we know what breaks.' | Photo: Luke Chesser · CC0")

### Set thresholds before you start

Decide in advance: what gap is acceptable?

For us, we said the cheaper model had to be within 5% on accuracy and within 10% on actionability. Latency could not regress by more than 50ms.

If it hit those numbers in shadow testing, we would proceed to rollout. If it did not, we would tune the prompt or try a different model.

Thresholds keep you honest. Without them, you will find a way to justify any result because the pressure to cut costs is real.

## Rollout guardrails

You have tested. You have shadowed. The cheaper model looks good. Now you ship it.

This is where most teams relax. Do not.

### Feature flag everything

The swap should be behind a feature flag. Not a code change that requires a deploy to revert. A flag you can flip in five seconds if something goes wrong.

We used a simple percentage rollout. Start at 1% of traffic. Monitor for 24 hours. If nothing breaks, go to 5%. Then 10%. Then 25%. Then 50%. Then 100%.

At each stage, check the same metrics you tracked in shadow testing. If any metric regresses beyond your threshold, roll back.

### Monitor the things that do not show up in logs

Some problems are loud. Errors. Timeouts. Crashes. Those show up immediately.

Other problems are quiet. Customers who stop using the feature. Support tickets that mention "the summaries seem off." Churn that correlates with the rollout window.

Set up alerts for:
- Feature usage drop (more than 10% week-over-week)
- Support ticket volume (any increase mentioning the feature)
- Customer sentiment (if you have NPS or CSAT tied to this feature)

We caught a subtle issue at 25% rollout. Usage did not drop. But session length increased. People were reading the summaries, then going back to listen to the full call anyway. They did not trust the summary anymore.

That would not have shown up in logs. It showed up in behavior.

![A control panel with switches and buttons](./control-panel.webp "A feature flag is how you sleep at night after shipping. One switch, five seconds, full rollback. | Photo: Michael Dziedzic · CC0")

### Have a rollback plan that everyone knows

Write down, before you ship:
- Who has access to the feature flag
- What the rollback procedure is
- What threshold triggers an automatic rollback
- Who gets alerted if metrics cross the threshold

Test the rollback once before you need it. Make sure flipping the flag actually works. Make sure the alerts actually fire.

We learned this the hard way. The flag worked. But the alert went to a Slack channel nobody was watching. When metrics dipped at 3 a.m., we did not find out until morning standup.

## The one-page checklist

Here is the checklist I keep on my desk. Before any model swap, I check every box.

---

### LLM Migration Checklist

**Golden Test Set**
- [ ] Pulled 50 real production examples
- [ ] Added known failure cases
- [ ] Included business-critical scenarios
- [ ] Test set saved and versioned

**Metrics & Rubric**
- [ ] Defined metrics tied to business value
- [ ] Built scoring rubric (1-5 scale, specific definitions)
- [ ] Scored expensive model baseline
- [ ] Scored cheaper model on same test set
- [ ] Gap within acceptable threshold (<10% on critical metrics)

**Shadow Testing**
- [ ] Instrumentation in place (logs both responses + scores)
- [ ] Shadow test running on 100% of production traffic
- [ ] Ran for at least 1 week or 5,000 requests
- [ ] Reviewed edge case performance
- [ ] No silent failures or accuracy drops

**Rollout Plan**
- [ ] Feature flag configured (percentage-based rollout)
- [ ] Rollback procedure documented and tested
- [ ] Alerts set for usage drop, support tickets, errors
- [ ] Stakeholders informed of rollout schedule
- [ ] Monitoring dashboard ready

**Rollout Stages**
- [ ] 1% for 24 hours → Monitor
- [ ] 5% for 24 hours → Monitor
- [ ] 10% for 48 hours → Monitor
- [ ] 25% for 48 hours → Monitor
- [ ] 50% for 72 hours → Monitor
- [ ] 100% → Monitor for 1 week

**Post-Rollout**
- [ ] Cost reduction confirmed (actual vs projected)
- [ ] Metrics stable at baseline or better
- [ ] No increase in support tickets
- [ ] Feature usage stable or growing
- [ ] Document lessons learned

---

## What I would do differently next time

The first time we did this, we skipped shadow testing. We went straight from test set to rollout. That was stupid. We got lucky.

The second time, we over-indexed on shadow testing and spent three weeks analyzing logs that mostly said "everything is fine." That was slow.

The balance I have landed on: shadow test for one week or until you hit 5,000 requests, whichever comes first. That is enough to catch the loud problems. For the quiet ones, you need real rollout with real users.

I would also start the golden test set earlier. We built ours after we had already decided to migrate. That meant it was biased toward cases that made the cheaper model look good. Build it when you are still deciding, not after you have already committed.

![A path through a misty forest](./path-forward.webp "Migrating models is not a one-time decision. It is a process you will repeat every time the market shifts. | Photo: Karina Vorozheeva · CC0")

One more thing. The first model migration is terrifying. The second one is easier. By the third, it is part of the release process. That is the goal. Not to do this once. To build the system so you can do it again when the next cheaper model shows up.

## The business case you can actually make

Here is what I told the person who asked if we could swap the model.

Yes. But not today. It will take three weeks to do it right. We need to build a test set. We need to shadow test. We need to roll out slowly.

If we do it right, we will cut costs and keep the product stable. If we rush it, we will cut costs, break the product, and spend the next two months fixing customer trust.

Three weeks for the process. Or six months for the recovery. Pick one.

They picked three weeks.

The cheaper model is live now. Costs are down. The feature still works. Customers have not noticed.

That is what success looks like. Not a dramatic launch. Just a quiet migration that nobody talks about because nothing broke.

If you are sitting at your desk right now, staring at an API bill that is too high and a cheaper model that might work, this is your checklist. Do the work. Build the test set. Shadow test. Roll out carefully.

The cost savings are real. So is the risk. This is how you get one without the other.

---

**Want the checklist as a PDF?** I will put a downloadable version on the site soon. In the meantime, screenshot it, print it, or copy it into your runbook. Just do not skip the steps because you are in a hurry. That is how products break.
