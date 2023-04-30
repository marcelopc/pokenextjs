import Image from 'next/image';

export function Tipos({ tipo, width = 100, height = 100 }){

    return(<Image src={`https://kai-tw.github.io/PokeCard/icons/${tipo}.png`} width={width} height={height} alt={tipo} />);
}