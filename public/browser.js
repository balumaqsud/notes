const addListItmes = (item) => {
  return `<li
              class="list-group-itemp p-1 mb-3 list-group-item-indo d-flex align-items-center justify-content-between"
            >
              <div>
                <h6 class="list_title m-0 ">${item.title}</h6>
                <p class="list_body m-0 text-secondary">${item.body}</p>
                <p style="font-size: 12px;">${item.createdAt}</p>
              </div>
              <div>
                <button data-id="${item._id}" class="delete_button btn btn-light btn-sm">
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

  if (title_input.value !== "" || body_input.value !== "") {
    axios
      .post("/create-item", {
        title: title_input.value,
        body: body_input.value,
      })
      .then((response) => {
        document
          .getElementById("notes_ul")
          .insertAdjacentHTML("beforeend", addListItmes(response.data));
        title_input.value = "";
        body_input.value = "";
        title_input.focus();
      })
      .catch((error) =>
        console.log(`something went wrong in axios.post-then with ${error}`)
      );
  } else {
    alert("Please name the note! and write someting!");
  }
});

//operations
document.addEventListener("click", (e) => {
  // clear
  if (e.target.classList.contains("clear_btn")) {
    axios
      .post("/clear-all", { clear_all: true })
      .then((response) => location.reload())
      .catch((err) => err);
  }
  ///delete
  if (e.target.tagName === "IMG") {
    e.stopPropagation();
    e.target.closest(".delete_button").click();
  }
  if (e.target.classList.contains("delete_button")) {
    let button = e.target.closest(".delete_button");
    let data_id = button.getAttribute("data-id");
    axios
      .post("delete-item", { id: data_id })
      .then((response) => {
        if (response.data.success) {
          button.closest("li").remove();
        } else {
          console.error("Delete failed:", response.data.error);
        }
      })
      .catch((err) => err);
  }

  //update
});
