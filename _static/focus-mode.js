// Panel controls: hide the left panel, the right panel, or everything (full width), independently.
// Buttons are added to every page header; keyboard shortcuts: [ left, ] right, F full width.
// The layout is remembered between pages when the browser allows local storage.
(function () {
  var STORAGE_KEY = "python-beginners-panels";
  var root = document.documentElement;
  var state = load();

  function load() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
      return { left: !!saved.left, right: !!saved.right, top: !!saved.top };
    } catch (e) {
      return { left: false, right: false, top: false };
    }
  }

  function save() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage unavailable: the layout still works for this page */
    }
  }

  function setButton(id, iconClass, label, title) {
    var button = document.getElementById(id);
    if (!button) {
      return;
    }
    button.querySelector("i").className = iconClass;
    button.querySelector(".panel-button-label").textContent = label;
    button.title = title;
    button.setAttribute("aria-label", title);
  }

  function isFullWidth() {
    return state.left && state.right && state.top;
  }

  function render() {
    root.classList.toggle("hide-left-panel", state.left);
    root.classList.toggle("hide-right-panel", state.right);
    root.classList.toggle("hide-top-bar", state.top);

    setButton(
      "panel-left-button",
      state.left ? "fa-solid fa-angles-right" : "fa-solid fa-angles-left",
      state.left ? "Show left" : "Hide left",
      state.left ? "Show the left panel ([)" : "Hide the left panel ([)"
    );
    setButton(
      "panel-right-button",
      state.right ? "fa-solid fa-angles-left" : "fa-solid fa-angles-right",
      state.right ? "Show right" : "Hide right",
      state.right ? "Show the right panel (])" : "Hide the right panel (])"
    );
    setButton(
      "panel-full-button",
      isFullWidth() ? "fa-solid fa-table-columns" : "fa-solid fa-arrows-left-right-to-line",
      isFullWidth() ? "Exit full width" : "Full width",
      isFullWidth() ? "Show the panels and top bar again (F)" : "Hide both panels and the top bar (F)"
    );
  }

  function toggleLeft() {
    state.left = !state.left;
    if (!state.left) {
      state.top = false;
    }
    render();
    save();
  }

  function toggleRight() {
    state.right = !state.right;
    if (!state.right) {
      state.top = false;
    }
    render();
    save();
  }

  function toggleFullWidth() {
    var hide = !isFullWidth();
    state.left = hide;
    state.right = hide;
    state.top = hide;
    render();
    save();
  }

  function makeButton(id, onClick) {
    var button = document.createElement("button");
    button.id = id;
    button.type = "button";
    button.className = "btn btn-sm pst-navbar-icon panel-button";
    button.innerHTML = '<i></i><span class="panel-button-label"></span>';
    button.addEventListener("click", onClick);
    return button;
  }

  // Apply the saved layout before the page is drawn, to avoid a flash.
  render();

  document.addEventListener("DOMContentLoaded", function () {
    var headerButtons = document.querySelector(".article-header-buttons");
    if (headerButtons) {
      var first = headerButtons.firstChild;
      headerButtons.insertBefore(makeButton("panel-left-button", toggleLeft), first);
      headerButtons.insertBefore(makeButton("panel-right-button", toggleRight), first);
      headerButtons.insertBefore(makeButton("panel-full-button", toggleFullWidth), first);
    }

    var exitButton = document.createElement("button");
    exitButton.type = "button";
    exitButton.className = "panel-exit-button";
    exitButton.textContent = "Exit full width";
    exitButton.addEventListener("click", toggleFullWidth);
    document.body.appendChild(exitButton);

    render();

    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }
      var target = event.target;
      var tag = target && target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (target && target.isContentEditable)) {
        return;
      }
      if (event.key === "[") {
        event.preventDefault();
        toggleLeft();
      } else if (event.key === "]") {
        event.preventDefault();
        toggleRight();
      } else if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        toggleFullWidth();
      }
    });
  });
})();
