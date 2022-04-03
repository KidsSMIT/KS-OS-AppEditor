class LoginInError extends Error {
  static #errIDs = [];

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);

    this.id = LoginInError.ErrorIdGenerator();

    document.body.appendChild(this.createErrorElement());
  }

  /**
   * Creates new element with the error name and message
   * @returns {HTMLElement} - The error element
   */
  createErrorElement() {
    let node = document.createElement("div");

    node.id = this.constructor.name + this.id;

    node.classList.add("error");

    node.style = `
        boder: 2px solid gainsboro;
        border-radius: 10px;
        padding: 10px;
        font-size: 20px;
        background: white;
        margin-top: 20vh;
    `;

    node.innerHTML = `
        <div class="error-header">
          <h1 style="border-bottom: 2px solid black">${this.constructor.name}</h1>
          <h2>${this.message}</h2>
        </div>
        <div class="error-body">
          <button onclick="this.parentElement.parentElement.remove()" style="width: 10%; border: 2px solid gainsboro; padding: 10px;
          border-radius: 5px;">Close</button>
        </div>
    `;

    return node;
  }

  /**
   * Returns a unique ID for the error.
   * @returns {string} - The error id
   */
   static ErrorIdGenerator() {
    const id = Math.random().toString(36).substr(2, 9);
    if (LoginInError.#errIDs.includes(id)) {
      return this.ErrorIdGenerator();
    }
    LoginInError.#errIDs.push(id);
    return id;
  }
}
