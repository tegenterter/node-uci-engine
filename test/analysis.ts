import "mocha";
import { expect } from "chai";
import { DepthResolution } from "../src/Analysis/Resolution/DepthResolution";
import { Engine } from "../src/Engine/Engine";
import { Result } from "../src/Analysis/Result";
import { Position } from "../src/Analysis/Position";

const timeout = 10000;
const enginePath = "./engine/stockfish-windows-x86-64-avx2";

describe("Analysis", (): void => {
    it("Should find the best move Bd5 at the requested depth with the correct evaluation", (done: Function): void => {
        const engine = new Engine(enginePath);
        const position = new Position("r1bqkb1r/5ppp/p2ppn2/1pn5/3NP3/1BN5/PPP2PPP/R1BQR1K1 w kq - 0 1");
        const resolution = new DepthResolution(20);

        engine.analyzePosition(
            position,
            resolution,
            (result: Result): void => {
                expect(engine.isActive()).to.eq(false);

                expect(result.getResolution().getProperty()).to.eq("depth");
                expect(result.getResolution().getValue()).to.eq(resolution.getValue());
                expect(result.getPosition().getFen()).to.eq(position.getFen());
                expect(result.getAnalysis().getLine().getFirstMove().getNotation()).to.eq("b3d5");
                expect(result.getAnalysis().getEvaluation().getValue()).to.be.greaterThan(200);

                done();
            }
        );
    }).timeout(timeout);

    it("Should find the best move Bh3 at the requested depth with the correct evaluation", (done: Function): void => {
        const engine = new Engine(enginePath);
        const position = new Position("8/8/4kpp1/3p1b2/p6P/2B5/6P1/6K1 b - - 0 1");
        const resolution = new DepthResolution(25);

        engine.analyzePosition(
            position,
            resolution,
            (result: Result): void => {
                expect(engine.isActive()).to.eq(false);

                expect(result.getResolution().getProperty()).to.eq("depth");
                expect(result.getResolution().getValue()).to.eq(resolution.getValue());
                expect(result.getPosition().getFen()).to.eq(position.getFen());
                expect(result.getAnalysis().getLine().getFirstMove().getNotation()).to.eq("f5h3");
                expect(result.getAnalysis().getEvaluation().getValue()).to.be.greaterThan(200);

                done();
            }
        );
    }).timeout(timeout);
});
