export  function getPokemonColor(type){
    var colorMap=new Map();

    colorMap.set("normal","#DDCBD0");
    colorMap.set("fighting","#FCC1B0");
    colorMap.set("flying","#B2D2E8");
    colorMap.set("poison","#CFB7ED");
    colorMap.set("ground","#F4D1A6");
    colorMap.set("rock","#C5AEA8");
    colorMap.set("bug","#C1E0C8");
    colorMap.set("ghost","#D7C2D7");
    colorMap.set("steel","#C2D4CE");
    colorMap.set("fire","#EDC2C4");
    colorMap.set("water","#CBD5ED");
    colorMap.set("grass","#C0D4C8");
    colorMap.set("electric","#E2E2A0");
    colorMap.set("psychic","#DDC0CF");
    colorMap.set("ice","#C7D7DF");
    colorMap.set("dragon","#CADCDF");
    colorMap.set("dark","#C6C5E3");
    colorMap.set("fairy","#E4C0CF");
    colorMap.set("unknown","#C0DFDD");
    colorMap.set("shadow","#CACACA");

    return colorMap.has(type)?colorMap.get(type):colorMap.get("unknown");
}

export  function strToCamelCase(str){
    var ans = str.toLowerCase();
    
    return ans.charAt(0).toUpperCase()+ans.slice(1);
    
}

export function extarctingOffSet(url){
    if(url===null)
        return null;
    var w=url.split('/');
    var v=w[5].split('=')[1].split('&');
    var val=Number(v[0])
    return val;
}

export function extractPokemonIndex(url){
    if(url===null)
        return null;

    const arr=url.split('/');
    return Number(arr[arr.length-2]);
}

export function getShortName(name){
    if(name==='special-defense')
        return "Sp.Defence";
    else if(name==="special-attack")
        return "Sp.Attack";
    else
        return name;
}

export function formatPokemonIndex(id){
        return ("000" + Number(id)).slice(-4);
}