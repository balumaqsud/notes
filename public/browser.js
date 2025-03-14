const addListItmes = (item) => {
  return `<li
              class="list-group-itemp p-1 mb-3 list-group-item-indo d-flex align-items-center justify-content-between"
            >
              <div>
                <h6 class="list_title m-0 ">${item.title}</h6>
                <p class="list_body m-0 text-secondary">${item.body}</p>
                <p>${moment().format("DD.YY.YYYY")}</p>
              </div>
              <div>
                <button data-id="${
                  item._id
                }" class="delete_button btn btn-light btn-sm">
                  <img width="18px" height="22px" src="icons/trash.svg" />
                </button>
              </div>
            </li>`;
};
// axios post and get mentods
document.getElementById("create-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let title_input = document.getElementById("form_input_title");
  let body_input = document.getElementById("form_textarea_body");
  axios
    .post("/create-item", {
      title: title_input.value,
      body: body_input.value,
    })
    .then((response) => {
      document
        .getElementById("notes_ul")
        .insertAdjacentHTML("afterbegin", addListItmes(response.data));
      title_input.value = "";
      body_input.value = "";
      title_input.focus();
    })
    .catch((error) =>
      console.log(`something went wrong in axios.post-then with ${error}`)
    );
});

//operations
document.addEventListener("click", (e) => {
  data_id = e.target.getAttribute("data-id");
  console.log(data_id);
  if (e.target.classList.contains("delete_button")) {
    axios
      .post("/delete-item", { id: data_id })
      .then((response) => {
        e.target.parentElement.parentElement.remove();
        location.reload();
      })
      .catch((err) => err);
  }
});
