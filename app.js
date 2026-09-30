// Sign-In Popup - demo app for test automation practice.
// Plain JS, no backend, no framework - mirrors demo-login-portal's and
// demo-todo-list's build style (single script, data-testid on every
// interactive element) so the same DOM-capture/automation pipeline can be
// pointed at it. Implements examples/signin-popup-spec.md.

const ACCOUNTS = [{ username: "demo", password: "Demo@123" }];

const openBtn = document.getElementById("openSignin");
const overlay = document.getElementById("popupOverlay");
const closeBtn = document.getElementById("popupClose");
const signinForm = document.getElementById("signinForm");
const helloWorld = document.getElementById("helloWorld");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorEl = document.getElementById("signinError");
const signinButton = document.getElementById("signinButton");
const cancelButton = document.getElementById("cancelButton");

function showError(text) {
  errorEl.textContent = text;
  errorEl.classList.add("show");
}

function hideError() {
  errorEl.textContent = "";
  errorEl.classList.remove("show");
}

function resetForm() {
  // Rule 7: every (re)open starts fresh - blank fields, no error, form
  // shown rather than the Hello World message.
  usernameInput.value = "";
  passwordInput.value = "";
  hideError();
  signinForm.classList.remove("hidden");
  helloWorld.classList.add("hidden");
}

function openPopup() {
  // Rule 1: opens via the Sign in link, always with blank fields.
  resetForm();
  overlay.classList.remove("hidden");
}

function closePopup() {
  // Rule 6/8: Cancel, the X, and the overlay click all just close - nothing
  // is remembered (rule 8), so the next open runs resetForm() again anyway.
  overlay.classList.add("hidden");
}

function attemptSignin() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password.trim()) {
    // Rule 2: blank/whitespace-only - generic error, no account lookup.
    showError("Enter a username and password.");
    return;
  }

  const account = ACCOUNTS.find(
    (a) => a.username.toLowerCase() === username.toLowerCase()
  );

  if (!account || account.password !== password) {
    // Rule 4: deliberately non-specific about which part was wrong.
    // Password cleared, Username left as typed.
    showError("Incorrect username or password.");
    passwordInput.value = "";
    return;
  }

  // Rule 5: success swaps the form for a static message, in place - no
  // close, no redirect.
  hideError();
  signinForm.classList.add("hidden");
  helloWorld.classList.remove("hidden");
}

openBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);
cancelButton.addEventListener("click", closePopup);
signinButton.addEventListener("click", attemptSignin);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closePopup();
  }
});
