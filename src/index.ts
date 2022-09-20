const squares: [green: string, white: string, yellow: string] = [
  "🟩",
  "⬜️",
  "🟨",
];

const letterCount = 5;

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createScore() {
  const amount = getRandomIntInclusive(1, 6);
  const rows = Array.from(Array(amount));

  let result = "";

  for (let index = 0; index < rows.length; index++) {
    let value: string;
    const isLast = index + 1 === rows.length;

    if (isLast) {
      value = Array.from("🟩".repeat(5)).join("");
      result += value;
    } else {
      value = Array.from(
        { length: 5 },
        () => squares[getRandomIntInclusive(0, 2)]
      ).join("");
      result += value + "\n";
    }
  }

  return `Wordle ${amount}/6\n\n` + result;
}

const html = () => `<!DOCTYPE html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>Fake a wordle score</h1>
  <div id="score" style="white-space: pre-line">${createScore()}</div>
  <p>Your family is still playing wordle and while you love them, you have other things to do.</p>
  <p class="result"></p>
  <button>share</button>
  <script>
		const btn = document.querySelector('button');
		const resultPara = document.querySelector('.result');
		
		btn.addEventListener('click', async () => {
			const shareText = document.getElementById('score').textContent;
			try {
				if (navigator.canShare) {
					await navigator.share({
						text: shareText,
					});
				} else {
					await navigator.clipboard.writeText(shareText)
				}
			} catch (err) {
				console.error(err)
			}
		});
  </script>
</body>`;

async function handleRequest(request: Request) {
  return new Response(html(), {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
}

addEventListener("fetch", (event) => {
  return event.respondWith(handleRequest(event.request));
});
