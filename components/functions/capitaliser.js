const capitaliser = (listName) => {
  const name = listName && listName.list_name.split("_").map(elem => elem.split("").map((e, i) => i === 0 ? e.toUpperCase() : e).join("")).join(" ");
  return name;
};
export default capitaliser;