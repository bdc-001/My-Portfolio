(async () => {
  const url = "https://en.wikipedia.org/w/api.php?action=query&titles=Aman_Gupta&prop=pageimages&format=json&pithumbsize=500";
  const res = await fetch(url);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
})();
