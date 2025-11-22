import React, { useMemo } from 'react';
import type { IPokemonType } from '../../models/pokemon.model';
import { usePokemonTypeDetails } from '../../shared/hooks/tanstackQueries';
import Skeleton from 'react-loading-skeleton';

interface PokemonTypeEffectivenessProps {
    pokemonTypes: IPokemonType[];
}

type DamageMultiplier = '4x' | '2x' | '1x' | '0.5x' | '0.25x' | '0x';

interface TypeEffectiveness {
    type: string;
    multiplier: DamageMultiplier;
}

const PokemonTypeEffectiveness: React.FC<PokemonTypeEffectivenessProps> = ({ pokemonTypes }) => {
    // Fetch type data for each of the Pokemon's types
    const type1Name = pokemonTypes[0]?.type?.name || '';
    const type2Name = pokemonTypes[1]?.type?.name || '';

    const { data: type1Data, isPending: isPending1 } = usePokemonTypeDetails(type1Name);
    const { data: type2Data, isPending: isPending2 } = usePokemonTypeDetails(type2Name);

    const isPending = isPending1 || (type2Name && isPending2);

    // Calculate combined type effectiveness
    const effectiveness = useMemo(() => {
        if (!type1Data) return { weaknesses: [], resistances: [], immunities: [] };

        const multipliers = new Map<string, number>();

        // Initialize all types to 1x (neutral)
        const allTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
        allTypes.forEach(type => multipliers.set(type, 1));

        // Apply type 1 damage relations
        type1Data.damage_relations.double_damage_from.forEach(({ name }) => {
            multipliers.set(name, (multipliers.get(name) || 1) * 2);
        });
        type1Data.damage_relations.half_damage_from.forEach(({ name }) => {
            multipliers.set(name, (multipliers.get(name) || 1) * 0.5);
        });
        type1Data.damage_relations.no_damage_from.forEach(({ name }) => {
            multipliers.set(name, 0);
        });

        // Apply type 2 damage relations if dual-type
        if (type2Data) {
            type2Data.damage_relations.double_damage_from.forEach(({ name }) => {
                multipliers.set(name, (multipliers.get(name) || 1) * 2);
            });
            type2Data.damage_relations.half_damage_from.forEach(({ name }) => {
                multipliers.set(name, (multipliers.get(name) || 1) * 0.5);
            });
            type2Data.damage_relations.no_damage_from.forEach(({ name }) => {
                multipliers.set(name, 0);
            });
        }

        // Categorize by multiplier
        const weaknesses: TypeEffectiveness[] = [];
        const resistances: TypeEffectiveness[] = [];
        const immunities: TypeEffectiveness[] = [];

        multipliers.forEach((value, type) => {
            if (value === 0) {
                immunities.push({ type, multiplier: '0x' });
            } else if (value === 4) {
                weaknesses.push({ type, multiplier: '4x' });
            } else if (value === 2) {
                weaknesses.push({ type, multiplier: '2x' });
            } else if (value === 0.5) {
                resistances.push({ type, multiplier: '0.5x' });
            } else if (value === 0.25) {
                resistances.push({ type, multiplier: '0.25x' });
            }
        });

        return { weaknesses, resistances, immunities };
    }, [type1Data, type2Data]);

    // Don't render if no pokemon types provided
    if (!type1Name || pokemonTypes.length === 0) {
        return null;
    }

    if (isPending) {
        return (
            <div className="container__detail-card-info-effectiveness">
                <Skeleton height={24} width={180} style={{ marginBottom: '16px' }} />
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <Skeleton width={60} height={32} borderRadius={999} count={6} inline style={{ marginRight: '8px' }} />
                </div>
            </div>
        );
    }

    const { weaknesses, resistances, immunities } = effectiveness;

    // Don't render if there's no meaningful type effectiveness data
    if (weaknesses.length === 0 && resistances.length === 0 && immunities.length === 0) {
        return null;
    }

    return (
        <div className="container__detail-card-info-effectiveness">
            <h2>Type Effectiveness</h2>

            {weaknesses.length > 0 && (
                <div className="effectiveness-section">
                    <h3 className="effectiveness-label weak">Weak to:</h3>
                    <div className="effectiveness-types">
                        {weaknesses.map(({ type, multiplier }) => (
                            <div key={type} className={`effectiveness-badge weak ${type}`}>
                                <span className="type-name">{type}</span>
                                <span className="multiplier">{multiplier}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {resistances.length > 0 && (
                <div className="effectiveness-section">
                    <h3 className="effectiveness-label resistant">Resistant to:</h3>
                    <div className="effectiveness-types">
                        {resistances.map(({ type, multiplier }) => (
                            <div key={type} className={`effectiveness-badge resistant ${type}`}>
                                <span className="type-name">{type}</span>
                                <span className="multiplier">{multiplier}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {immunities.length > 0 && (
                <div className="effectiveness-section">
                    <h3 className="effectiveness-label immune">Immune to:</h3>
                    <div className="effectiveness-types">
                        {immunities.map(({ type, multiplier }) => (
                            <div key={type} className={`effectiveness-badge immune ${type}`}>
                                <span className="type-name">{type}</span>
                                <span className="multiplier">{multiplier}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonTypeEffectiveness;
