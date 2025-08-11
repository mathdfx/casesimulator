import React, { useState, useRef, useEffect, useMemo } from 'react';
import * as Tone from 'tone';

const items = [
    { id: 'item-01', name: 'Glock-18 | Azul Fissurado', rarity: 'Mil-Spec Grade', icon_url: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1T9s2teqV8NfWfG3WV_uNztOh8Qmeylx9x6mnXyo37eHLCaQ91DsAiQ7FY5xO-kIfhN-Pr4AeL3YsWyn6skGoXueOEyY68/360fx360f' },
    { id: 'item-02', name: 'USP-S | Córtex', rarity: 'Mil-Spec Grade', icon_url: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_u1jpN5kSi26gBBp4D7TwoqsJC6faQUiWcchQrECu0Kwk4K2P-zltVHbj44RnyT2jH8b5zErvbgF1pSM3w/360fx360f' },
    { id: 'item-03', name: 'MP7 | Anodizado Azul', rarity: 'Mil-Spec Grade', icon_url: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_Cxk4fO4cZthKfebGinIw-0v5-cxS33kwEh2tz-HyYugJC7FZwVyXJZ2FO4CtBa4xtPkN-nn-UWA3HYryggq/360fx360f' },
    { id: 'item-04', name: 'M4A4 | O Imperador', rarity: 'Restricted', icon_url: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSJf2DC3Wf09F7teVgWiT9kEtxsW_dntepcn2SZgF1CcN3RORe4RTtlN2yYenh7wPXiYxDmS_22jQJsHjOUN0CaQ/360fx360f' },
    { id: 'item-05', name: 'Glock-18 | Lanches', rarity: 'Restricted', icon_url: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-AAGaTyu9ipOBqRBa_nBovp3PQyomrcHKSaQYkCcRwQe8LukHswYHhN-Kz7lOM3YoUni6tjn5K7C5u_a9cBhxPlKk2/360fx360f' },
    { id: 'item-06', name: 'AK-47 | Asiimov', rarity: 'Classified', icon_url: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeOaB2qf19F6ueZhW2e2wEt-t2jcytf6dymSO1JxA5oiRecLsRa5kIfkYr-241aLgotHz3-rkGoXuUp8oX57/360fx360f' },
    { id: 'item-07', name: 'M4A1-S | Printstream', rarity: 'Covert', icon_url: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_F7Rienhgk1tjyIpYPwJiPTcAAoCpsiEO5ZsUbpm9C2Zuni4VHW3o5EzSX62HxP7Sg96-hWVqYi_6TJz1aW0nxrkGs/360fx360f' },
    { id: 'item-08', name: 'Faca Karambit | Doppler', rarity: 'Exceedingly Rare', icon_url: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1iUzv5mvOR7cDm7lA4i4gKJk4jxNWXFb1cpDJR2FOFbsBTql9bjYbzq7gPZiN1MxH7_2ytNuCdpte1UB_Ui5OSJ2GbkVqni/360fx360f' }
];

const rarities = [
  { name: 'Mil-Spec Grade', chance: 0.60 },
  { name: 'Restricted', chance: 0.20},
  { name: 'Classified', chance: 0.15 },
  { name: 'Covert', chance: 0.10 },
  { name: 'Exceedingly Rare', chance: 0.05 }
];

const rarityClasses = {
  'Mil-Spec Grade': 'border-blue-500 bg-blue-900/30',
  'Restricted': 'border-purple-500 bg-purple-900/30',
  'Classified': 'border-pink-500 bg-pink-900/30',
  'Covert': 'border-red-500 bg-red-900/30',
  'Exceedingly Rare': 'border-yellow-500 bg-yellow-900/30',
};

const rarityColors = {
  'Mil-Spec Grade': 'text-blue-300',
  'Restricted': 'text-purple-300',
  'Classified': 'text-pink-300',
  'Covert': 'text-red-300',
  'Exceedingly Rare': 'text-yellow-300',
};

const VolumeOnIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>);
const VolumeOffIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const itemWidth = 144; 
const itemGap = 8;    
const itemFullWidth = itemWidth + itemGap;
const totalItems = 150;
const prizeIndex = 125; 

const generateItems = (startItem = null) => {
  const list = [];
  const startOffset = startItem ? 1 : 0;
  
  if (startItem) {
    list.push({ ...startItem, uniqueId: `start-${Date.now()}` });
  }

  const shuffledItems = shuffleArray([...items]);
  for (let i = 0; i < totalItems - startOffset; i++) {
    list.push({
      ...shuffledItems[i % shuffledItems.length],
      uniqueId: `item-${Date.now()}-${i}`
    });
  }
  return list;
};

function App() {
  const [reelItems, setReelItems] = useState(() => generateItems());
  const [wonItem, setWonItem] = useState(null);
  const [spinState, setSpinState] = useState('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const reelContainerRef = useRef(null);
  
  const sounds = useMemo(() => ({
    synth: new Tone.Synth().toDestination(),
    reelSynth: new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0 }
    }).toDestination()
  }), []);
  
  useEffect(() => {
    const savedMuteState = localStorage.getItem('isCaseMuted') === 'true';
    setIsMuted(savedMuteState);
  }, []);

  useEffect(() => {
    Tone.Master.mute = isMuted;
    localStorage.setItem('isCaseMuted', isMuted);
  }, [isMuted]);

  useEffect(() => {
    const containerWidth = reelContainerRef.current?.offsetWidth || 0;
    const startPos = (75 * itemFullWidth) + (itemWidth / 2) - (containerWidth / 2);
    setScrollPosition(startPos);
  }, []);

  const openCase = async () => {
    if (spinState !== 'idle' && spinState !== 'finished') return;
    
    await Tone.start();
    
    setWonItem(null);
    setSpinState('preparing');
    sounds.synth.triggerAttackRelease("C2", "8n");
    
    setTimeout(() => {
        const itemsForReel = generateItems(wonItem);

        const random = Math.random();
        let cumulative = 0;
        let chosenRarityName = rarities[rarities.length - 1].name;
        for (const rarity of rarities) {
            cumulative += rarity.chance;
            if (random < cumulative) {
                chosenRarityName = rarity.name;
                break;
            }
        }
        const possibleItems = items.filter(item => item.rarity === chosenRarityName);
        const finalWonItem = { ...possibleItems[Math.floor(Math.random() * possibleItems.length)], uniqueId: `winner-${Date.now()}` };
        itemsForReel[prizeIndex] = finalWonItem;

        const rareItems = items.filter(i => i.rarity === 'Covert' || i.rarity === 'Exceedingly Rare');
        const baitItem = rareItems[Math.floor(Math.random() * rareItems.length)];
        if(finalWonItem.id !== baitItem.id && prizeIndex > 0) {
            itemsForReel[prizeIndex - 1] = { ...baitItem, uniqueId: `bait-${Date.now()}` };
        }

        setReelItems(itemsForReel);
        setScrollPosition(0);

        requestAnimationFrame(() => {
            setSpinState('spinning');
            sounds.reelSynth.triggerAttackRelease(5.8); 

            const containerWidth = reelContainerRef.current?.offsetWidth || 0;
            const prizeItemLeft = prizeIndex * itemFullWidth;
            const prizeItemCenter = prizeItemLeft + (itemWidth / 2);
            const randomOffset = (Math.random() - 0.5) * (itemWidth * 0.4); 

            const targetPosition = prizeItemCenter - (containerWidth / 2) + randomOffset;
            setScrollPosition(targetPosition);
            
            setTimeout(() => {
                setSpinState('finished');
                setWonItem(finalWonItem);
                sounds.synth.triggerAttackRelease("C4", "4n");
            }, 7000);
        });

    }, 300); 
  };
  
  const getButtonContent = () => {
    if (spinState === 'preparing') return 'Preparando...';
    if (spinState === 'spinning') {
      return <span className="flex items-center justify-center gap-2"><span className="animate-spin">⌛</span>Girando...</span>;
    }
    return spinState === 'finished' ? 'Abrir novamente?' : 'Abrir Caixa';
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-black text-slate-200 min-h-screen flex items-center justify-center font-sans p-4 select-none">
      <div className="relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center max-w-5xl w-full border border-slate-700">
        <button onClick={() => setIsMuted(prev => !prev)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-30" aria-label="Toggle Volume">
          {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </button>
        <h1 className="text-4xl font-bold text-sky-400 mb-6 [text-shadow:0_0_8px_theme(colors.sky.500)]">Simulador de Caixa</h1>

        <div ref={reelContainerRef} className="relative w-full h-40 mb-6 ring-1 ring-slate-700/50 inset-0 bg-black/20 rounded-lg overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-sky-300 z-20 rounded-full shadow-[0_0_10px_3px] shadow-sky-400/70 animate-pulse"></div>
          
          <div
            className="flex h-full items-center gap-2"
            style={{
              transition: spinState === 'spinning' ? 'transform 6s cubic-bezier(0.1, 0.8, 0.2, 1)' : 'none',
              transform: `translateX(-${scrollPosition}px)`
            }}
          >
            {reelItems.map((item) => (
              <div key={item.uniqueId} className="flex-shrink-0" style={{width: `${itemWidth}px`}}>
                <div 
                  className={`h-36 flex flex-col items-center justify-center rounded-lg p-2 text-center transition-all duration-300 border-2 
                              ${wonItem?.uniqueId === item.uniqueId && spinState === 'finished' 
                                ? `scale-110 shadow-xl ${rarityClasses[item.rarity]} animate-pulse [animation-duration:1s]` 
                                : rarityClasses[item.rarity] || 'border-gray-400 bg-gray-900/20'
                              }`}
                >
                  <img src={item.icon_url} alt={item.name} className="w-20 h-20 object-contain mb-1 drop-shadow-lg"/>
                  <p className="text-xs font-semibold leading-tight line-clamp-2">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {wonItem && spinState === 'finished' && (
          <div className="my-6 p-1 bg-slate-900/50 rounded-lg border-2 border-yellow-400 max-w-sm mx-auto">
              <div className="flex justify-center items-center mb-4 pt-4">
                <span className="text-2xl mr-2">🎉</span>
                <h2 className="text-2xl font-bold text-yellow-300 [text-shadow:0_1px_1px_black]">Parabéns! Você ganhou:</h2>
              </div>
              <div className={`py-4 px-6 rounded-lg inline-flex flex-col items-center gap-4 ${rarityClasses[wonItem.rarity]} border-0 w-full`}>
                <img src={wonItem.icon_url} alt={wonItem.name} className="w-48 h-36 object-contain drop-shadow-xl"/>
                <div className='text-center mt-2'>
                  <div className="text-xl font-bold text-white mb-1">{wonItem.name}</div>
                  <div className={`text-base font-semibold ${rarityColors[wonItem.rarity] || 'text-gray-400'}`}>{wonItem.rarity}</div>
                  <div className="text-sm text-slate-400 mt-2">Chance de Raridade: {(rarities.find(r => r.name === wonItem.rarity)?.chance * 100).toFixed(2)}%</div>
                </div>
              </div>
          </div>
        )}

        <button onClick={openCase} disabled={spinState === 'preparing' || spinState === 'spinning'} className="px-8 py-3 w-64 rounded-lg font-bold text-lg transition-all duration-200 transform
                    disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-inner
                    bg-sky-500 text-slate-900 hover:bg-sky-400 hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/30 hover:shadow-sky-400/40">
          {getButtonContent()}
        </button>
      </div>
    </div>
  );
}

export default App;