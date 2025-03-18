let note_id = "";
//operations
document.addEventListener("click", (e) => {
  //list reading
  const li_item = e.target.closest(".list-group-item-indo");
  const id = li_item.getAttribute("data-id");
  note_id = id;
  if (note_id) {
    const title = li_item.querySelector(".list_title").textContent.trim();
    const body = li_item.querySelector(".list_body").textContent.trim();

    //populate form
    document.getElementById("form_input_title").value = title;
    document.getElementById("form_textarea_body").value = body;

    //button
    const button = document.querySelector(".create_btn");
    button.textContent = "Update";
  }

  // clear
  if (e.target.classList.contains("clear_btn")) {
    axios
      .post("/clear-all", { clear_all: true })
      .then((response) => location.reload())
      .catch((err) => err);
  }
  ///delete
  if (
    e.target.classList.contains("delete_button") ||
    e.target.tagName === "IMG"
  ) {
    e.stopPropagation();
    const button = e.target.closest(".delete_button");
    const data_id = button.getAttribute("data-id");
    axios
      .post("delete-item", { id: data_id })
      .then((response) => {
        if (response.data.success) {
          button.closest("li").remove();
          location.reload();
        } else {
          console.error("Delete failed:", response.data.error);
        }
      })
      .catch((err) => err);
  }
});

/////form
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
console.log("iddd", note_id);
document.getElementById("create-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let title_input = document.getElementById("form_input_title");
  let body_input = document.getElementById("form_textarea_body");
  let button = document.querySelector(".create_btn");

  if (note_id) {
    axios
      .post("/update-item", {
        id: note_id,
        title: title_input.value,
        body: body_input.value,
      })
      .then((response) => {
        console.log("updated");
        location.reload();
      })
      .catch((err) => {
        err;
      });
  } else if (title_input.value !== "" || body_input.value !== "") {
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
        location.reload();
      })
      .catch((error) =>
        console.log(`something went wrong in axios.post-then with ${error}`)
      );
  } else {
    alert("Please name the note! and write someting!");
  }

  //buttons
  button.textContent = "Save";
});
