import React from 'react'
import type { IPokemonDetails } from '../../models/pokemon.model';

interface IPokemonStatsProps {
    data: IPokemonDetails
}

const PokemonStats: React.FC<IPokemonStatsProps> = ({ data }) => {
    return (
        <div className="container__detail-card-info-third">
            <h2>Base Stats</h2>

            <div className="container__detail-card-info-third-container">
                {/* regular per-stat rows */}
                {data?.stats?.map((stat, idx) => {
                    const short =
                        idx === 0 ? "HP" :
                            idx === 1 ? "ATK" :
                                idx === 2 ? "DEF" :
                                    idx === 3 ? "SATK" :
                                        idx === 4 ? "SDEF" : "SPD";

                    const value = String(stat.base_stat).padStart(3, "0");

                    return (
                        <div
                            key={stat.stat.name}
                            className={`container__detail-card-info-third-container-progress ${data?.types?.[0]?.type?.name || "normal"
                                }-type`}
                        >
                            <span className="stat-name">{short}</span>
                            <span className="stat-val">{value}</span>
                            <progress max={100} value={stat.base_stat} />
                        </div>
                    );
                })}

                {/* --- TDT row ----------------------------------------------------- */}
                {(() => {
                    const stats = data?.stats?.map(s => s.base_stat) ?? [];
                    if (stats.length !== 6) return null;

                    const total = stats.reduce((a, b) => a + b, 0);
                    const avg = Math.round(total / stats.length);   // ← totalstats / stats.length
                    const tdtVal = Math.min(avg, 100);              // keep progress in [0..100]

                    return (
                        <div className={`container__detail-card-info-third-container-progress ${data?.types?.[0]?.type?.name || "normal"
                            }-type`}>
                            <span className="stat-name">TDT</span>
                            <span className="stat-val">{String(avg).padStart(3, "0")}</span>
                            <progress max={100} value={tdtVal} />
                        </div>
                    );
                })()}
            </div>
        </div>
    )
}

export default PokemonStats

