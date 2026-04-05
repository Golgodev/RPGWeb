// Velikost mapy můžeme "libovolně" bez nějaký bugu změnit
const blockSize = 60;
// Jak veliká má bát mapa jako taková
const gridRows = 12;
const gridCols = 22;
// Pozice mapy
let mapPositionX = [];
let mapPositionY = [];

// Můžeme změnit libovolně jak mapa má vypadat (Funguje na bázi id, kde vykresluje dané objekty pomocí čísel, jedině hráči nemají číslo a mají "player1" a "player2")
// 1 = stromy
// 2 = hory
// 3 = pasti (ještě není hotové)
// 15 = bomba
let map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];  

// Vytvoří to multidymenzionální array automaticky s velikostí mapy
let flower_map = Array.from({ length: gridRows }, () => Array(gridCols).fill(0));
let bomb_map = Array.from({ length: gridRows }, () => Array(gridCols).fill(0));

// Vygeneruje náhodné kytičky na mapě (pouze vyzuální) Když se na pozici objevuje strom, tak se kytička nesmí spawnout
function GenerateFlowers(percentage1, percentage2) {
  for (let i = 1; i < gridRows - 1; i++) {
    for (let j = 1; j < gridCols - 1; j++) {
      if (map[i][j] == 0) {
        const randomValue = Math.random() * 100;

        if (randomValue < percentage1) {
          flower_map[i][j] = 1;
        } else if (randomValue < percentage1 + percentage2) {
          flower_map[i][j] = 2;
        }
      }
    }
  }
}

// Tady můžeme změnit procenta na šanci spawnutí kytky
GenerateFlowers(1.5, 1.5);