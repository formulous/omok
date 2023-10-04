import { useEffect, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";

export default function Board() {
	const [squares, setSquares] = useState(Array(400).fill(null));
	const [xIsNext, setXIsNext] = useState(true);
	const [winner, setWinner] = useState(null);
	useEffect(() => {
		calculateWinner();
	}, [squares]);
	const numbers = [];
	// right-top | right | right-bottom | bottom
	const dirList = [0, 1, 2, 3];
	const cr = [-1, 0, 1, 1];
	const cc = [1, 1, 1, 0];

	function check(curVal, x, y, dir, dep) {
		if (curVal === null) {
			return;
		}

		const nx = x + cc[dir];
		const ny = y + cr[dir];

		if (curVal === squares[ny * 20 + nx]) {
			dep += 1;
			if (dep === 5) {
				setWinner(curVal);
				return;
			}
			check(curVal, nx, ny, dir, dep);
		} else {
			return;
		}
	}

	function calculateWinner() {
		for (let y = 0; y < 20; y++) {
			for (let x = 0; x < 20; x++) {
				if (x > 16 && y > 16) {
					continue;
				}
				for (const dir in dirList) {
					check(squares[y * 20 + x], x, y, dir, 1);
				}
			}
		}
	}

	function onClickSquare(n) {
		const nextSquare = squares.slice();

		if (nextSquare[n]) {
			alert("빈 칸에만 놓을 수 있습니다.");
			return;
		}

		xIsNext ? (nextSquare[n] = "white") : (nextSquare[n] = "black");
		setSquares(nextSquare);
		setXIsNext(!xIsNext);
	}

	function reset() {
		setSquares(Array(400).fill(null));
		setWinner(null);
		setXIsNext(true);
	}

	for (let i = 0; i < 20; i++) {
		numbers.push(i * 20);
	}

	return (
		<>
			{winner ? (
				<>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						height="100vh"
						position="absolute"
						top="0"
						left="0"
						right="0"
						bottom="0">
						<Typography variant="h1" align="center">
							{xIsNext ? "흑돌 승리 !!!!" : "백돌 승리 !!!!"}
						</Typography>
					</Box>
				</>
			) : null}
			{numbers.map((n) => (
				<div className="board-row">
					<Square
						value={squares[n]}
						winner={winner}
						onClickSquare={() => onClickSquare(n)}></Square>
					<Square
						value={squares[n + 1]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 1)}></Square>
					<Square
						value={squares[n + 2]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 2)}></Square>
					<Square
						value={squares[n + 3]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 3)}></Square>
					<Square
						value={squares[n + 4]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 4)}></Square>
					<Square
						value={squares[n + 5]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 5)}></Square>
					<Square
						value={squares[n + 6]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 6)}></Square>
					<Square
						value={squares[n + 7]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 7)}></Square>
					<Square
						value={squares[n + 8]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 8)}></Square>
					<Square
						value={squares[n + 9]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 9)}></Square>
					<Square
						value={squares[n + 10]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 10)}></Square>
					<Square
						value={squares[n + 11]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 11)}></Square>
					<Square
						value={squares[n + 12]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 12)}></Square>
					<Square
						value={squares[n + 13]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 13)}></Square>
					<Square
						value={squares[n + 14]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 14)}></Square>
					<Square
						value={squares[n + 15]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 15)}></Square>
					<Square
						value={squares[n + 16]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 16)}></Square>
					<Square
						value={squares[n + 17]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 17)}></Square>
					<Square
						value={squares[n + 18]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 18)}></Square>
					<Square
						value={squares[n + 19]}
						winner={winner}
						onClickSquare={() => onClickSquare(n + 19)}></Square>
				</div>
			))}
			<Button
				display="flex"
				align="center"
				position="absolute"
				justifyContent="center"
				alignItems="center"
				variant="contained"
				top="0"
				left="0"
				right="0"
				bottom="5"
				onClick={reset}>
				RESET
			</Button>
		</>
	);
}

function Square({ value, winner, onClickSquare }) {
	return (
		<button
			className={value === "white" ? "square white" : "square black"}
			onClick={onClickSquare}
			disabled={winner}>
			{value ? "●" : null}
		</button>
	);
}
