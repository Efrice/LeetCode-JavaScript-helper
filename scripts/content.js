window.addEventListener("load", () => {
  let title = ""
  let timer = setInterval(() => {
    if (!document.title.includes("Loading Question...")) {
      title = document.title.replace(/\s/g, "").split("-")[0]

      fetch("https://efrice.github.io/")
        .then((response) => response.body)
        .then((rb) => {
          const reader = rb.getReader()
          return new ReadableStream({
            start(controller) {
              function push() {
                reader.read().then(({ done, value }) => {
                  if (done) {
                    controller.close()
                    return
                  }
                  controller.enqueue(value)
                  push()
                })
              }
              push()
            },
          })
        })
        .then((stream) =>
          new Response(stream, {
            headers: { "Content-Type": "text/html" },
          }).text()
        )
        .then((result) => {
          const solve = document.createElement("a")
          if (result.match(title)) {
            solve.text = "题解"
            solve.href = "https://efrice.github.io/problems/" + title
          } else {
            solve.text = "暂无题解，欢迎提供"
            solve.href = "https://efrice.github.io/"
          }
          solve.target = "_blank"
          solve.style =
            "padding-left: 20px;color:#0090a4;text-decoration: underline"
          document.getElementsByTagName("h4")[0].append(solve)
          clearInterval(timer)
        })
    }
  }, 1e3)
})
