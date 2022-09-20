const squares: [green: string, white: string, yellow: string] = [
  "🟩",
  "⬜️",
  "🟨",
];

// navigator.clipboard.writeText(document.getElementById('score').textContent).then(() => {
// 	console.log('yes')
//   }, () => {
// 	  console.log('no')
//   });

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function createScore() {
  const amount = getRandomIntInclusive(1, 6);
  const rows = Array.from(Array(amount));

  let result = "";
  for (let index = 0; index < rows.length; index++) {
    let value;

    if (index + 1 === rows.length) {
      value = Array.from("🟩".repeat(6)).join("");
      result += value;
    } else {
      value = Array.from(
        { length: 6 },
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
		
		// Share must be triggered by "user activation"
		btn.addEventListener('click', async () => {
			console.log('click');
			
			try {
			await navigator.share({
				text: document.getElementById('score').textContent,
			});
			
			} catch (err) {
				alert('error')
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
