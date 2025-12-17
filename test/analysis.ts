import "mocha";
import { expect } from "chai";
import { DepthResolution } from "../src/Analysis/Resolution/DepthResolution";
import { Engine } from "../src/Engine/Engine";
import { Result } from "../src/Analysis/Result";
import { Position } from "../src/Analysis/Position";

describe("Analysis", (): void => {
    const resolution = new DepthResolution(20);

    it("Should find the best move Bd5 at the requested depth with the correct evaluation", (done: Function): void => {
        const engine = new Engine("./engine/stockfish-windows-x86-64-avx2");
        const position = new Position("r1bqkb1r/5ppp/p2ppn2/1pn5/3NP3/1BN5/PPP2PPP/R1BQR1K1 w kq - 0 1");

        engine.analyzePosition(
            position,
            resolution,
            (result: Result): void => {
                expect(result.getResolution().getProperty()).to.eq("depth");
                expect(result.getResolution().getValue()).to.eq(resolution.getValue());
                expect(result.getPosition().getFen()).to.eq(position.getFen());
                expect(result.getAnalysis().getLine().getFirstMove().getNotation()).to.eq("b3d5");
                expect(result.getAnalysis().getEvaluation().getValue()).to.be.greaterThan(200);

                done();
            }
        );
    });

    it("Should find the best move Qg3 at the requested depth with the correct evaluation", (done: Function): void => {
        const engine = new Engine("./engine/stockfish-windows-x86-64-avx2");
        const position = new Position("5rk1/pp4pp/4p3/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 b - - 0 1");

        engine.analyzePosition(
            position,
            resolution,
            (result: Result): void => {
                expect(result.getResolution().getProperty()).to.eq("depth");
                expect(result.getResolution().getValue()).to.eq(resolution.getValue());
                expect(result.getPosition().getFen()).to.eq(position.getFen());
                expect(result.getAnalysis().getLine().getFirstMove().getNotation()).to.eq("c3g3");
                expect(result.getAnalysis().getEvaluation().getValue()).to.be.greaterThan(500);

                done();
            }
        );
    });
});
