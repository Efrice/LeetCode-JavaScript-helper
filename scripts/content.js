window.addEventListener("load", () => {
let title = "";
const solve = document.createElement("a");
const mainLink = "https://efrice.github.io/LeetCode-JavaScript/problems/";
const noSolveLink = "https://efrice.github.io/";
const solveText = "题解";
const noSolveText = "暂无题解，欢迎提供";
const solveStyle = "padding-left: 20px;color:#0090a4;text-decoration: underline";
const checkTitle = () => {
  if (!document.title.includes("Loading Question...")) {
    title = document.title.replace(/\s/g, "").split("-")[0];
    fetch("https://efrice.github.io/")
      .then((response) => response.body)
      .then((rb) => {
        const reader = rb.getReader();
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                push();
              });
            }
            push();
          },
        });
      })
      .then((stream) =>
        new Response(stream, {
          headers: { "Content-Type": "text/html" },
        }).text()
      )
      .then((result) => {
        if (result.match(title)) {
          solve.text = solveText;
          solve.href = mainLink + title;
        } else {
          solve.text = noSolveText;
          solve.href = noSolveLink;
        }
        const h4 = document.getElementsByTagName("h4")[0];
        solve.target = "_blank";
        solve.style = solveStyle;
        h4.append(solve);
        clearInterval(timer);
      });
  }
};
const timer = setInterval(checkTitle, 1000);
})
