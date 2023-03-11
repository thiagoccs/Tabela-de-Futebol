"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var MatchModel_1 = require("../../database/models/MatchModel");
var TeamModel_1 = require("../../database/models/TeamModel");
var LeaderBoardService = /** @class */ (function () {
    function LeaderBoardService() {
        this.teamModel = TeamModel_1["default"];
        this.matchModel = MatchModel_1["default"];
    }
    LeaderBoardService.prototype.findAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            var allTeams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.teamModel.findAll()];
                    case 1:
                        allTeams = _a.sent();
                        return [2 /*return*/, allTeams];
                }
            });
        });
    };
    LeaderBoardService.totalDeVitorias = function (id, matches) {
        var vitorias = matches.filter(function (_a) {
            var homeTeamId = _a.homeTeamId, homeTeamGoals = _a.homeTeamGoals, awayTeamId = _a.awayTeamId, awayTeamGoals = _a.awayTeamGoals;
            console.log(homeTeamGoals);
            return (homeTeamId === id && homeTeamGoals > awayTeamGoals)
                || (awayTeamId === id && awayTeamGoals > homeTeamGoals);
        }).length;
        return vitorias;
    };
    LeaderBoardService.totalDeEmpates = function (id, matches) {
        var totalDraws = matches
            .reduce(function (acc, _a) {
            var homeTeamId = _a.homeTeamId, awayTeamId = _a.awayTeamId, homeTeamGoals = _a.homeTeamGoals, awayTeamGoals = _a.awayTeamGoals;
            if (homeTeamId === id && homeTeamGoals === awayTeamGoals) {
                return acc + 1;
            }
            if (awayTeamId === id && awayTeamGoals === homeTeamGoals) {
                return acc + 1;
            }
            return acc;
        }, 0);
        return totalDraws;
    };
    LeaderBoardService.totalDePontos = function (id, matches) {
        var victories = LeaderBoardService.totalDeVitorias(id, matches);
        var draws = LeaderBoardService.totalDeEmpates(id, matches);
        var totalPoints = victories * 3 + draws;
        return totalPoints;
    };
    LeaderBoardService.totalDeJogos = function (id, matches) {
        var totalGames = matches.reduce(function (acc, _a) {
            var homeTeamId = _a.homeTeamId, awayTeamId = _a.awayTeamId;
            if (homeTeamId === id || awayTeamId === id) {
                return acc + 1;
            }
            return acc;
        }, 0);
        return totalGames;
    };
    LeaderBoardService.totalDeDerrotas = function (id, matches) {
        var totalLosses = matches
            .reduce(function (acc, _a) {
            var homeTeamId = _a.homeTeamId, homeTeamGoals = _a.homeTeamGoals, awayTeamId = _a.awayTeamId, awayTeamGoals = _a.awayTeamGoals;
            if (homeTeamId === id && homeTeamGoals < awayTeamGoals) {
                return acc + 1;
            }
            if (awayTeamId === id && awayTeamGoals < homeTeamGoals) {
                return acc + 1;
            }
            return acc;
        }, 0);
        return totalLosses;
    };
    LeaderBoardService.golsAFavor = function (id, matches) {
        var goalsFavor = matches
            .reduce(function (acc, _a) {
            var homeTeamId = _a.homeTeamId, awayTeamId = _a.awayTeamId, homeTeamGoals = _a.homeTeamGoals, awayTeamGoals = _a.awayTeamGoals;
            if (homeTeamId === id)
                return acc + homeTeamGoals;
            if (awayTeamId === id)
                return acc + awayTeamGoals;
            return acc;
        }, 0);
        return goalsFavor;
    };
    LeaderBoardService.golsContra = function (id, matches) {
        var goalsOwn = matches
            .reduce(function (acc, _a) {
            var homeTeamId = _a.homeTeamId, awayTeamId = _a.awayTeamId, homeTeamGoals = _a.homeTeamGoals, awayTeamGoals = _a.awayTeamGoals;
            if (homeTeamId === id)
                return acc + awayTeamGoals;
            if (awayTeamId === id)
                return acc + homeTeamGoals;
            return acc;
        }, 0);
        return goalsOwn;
    };
    LeaderBoardService.saldoDeGols = function (id, matches) {
        var GF = this.golsAFavor(id, matches);
        var GO = this.golsContra(id, matches);
        var goalsBalance = GF - GO;
        return goalsBalance;
    };
    LeaderBoardService.aproveitamento = function (id, matches) {
        var TP = this.totalDePontos(id, matches);
        var TG = this.totalDeJogos(id, matches);
        var efficiency = ((TP / (TG * 3)) * 100).toFixed(2);
        return efficiency;
    };
    LeaderBoardService.calculoDePontos = function (teams, matches) {
        var _this = this;
        var result = teams.map(function (_a) {
            var id = _a.id, teamName = _a.teamName;
            return ({
                name: teamName,
                totalPoints: _this.totalDePontos(id, matches),
                totalGames: _this.totalDeJogos(id, matches),
                totalVictories: _this.totalDeVitorias(id, matches),
                totalDraws: _this.totalDeEmpates(id, matches),
                totalLosses: _this.totalDeDerrotas(id, matches),
                goalsFavor: _this.golsAFavor(id, matches),
                goalsOwn: _this.golsContra(id, matches),
                goalsBalance: _this.saldoDeGols(id, matches),
                efficiency: _this.aproveitamento(id, matches)
            });
        });
        return result;
    };
    LeaderBoardService.prototype.leaderboard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var teams, matches, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.teamModel.findAll()];
                    case 1:
                        teams = _a.sent();
                        return [4 /*yield*/, this.matchModel.findAll({
                                where: { inProgress: 0 },
                                raw: true
                            })];
                    case 2:
                        matches = _a.sent();
                        result = LeaderBoardService.calculoDePontos(teams, matches);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return LeaderBoardService;
}());
exports["default"] = LeaderBoardService;
