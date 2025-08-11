import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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

const rarityClasses = {
  'Mil-Spec Grade': 'border-blue-500 bg-blue-900/20 text-blue-300',
  'Restricted': 'border-purple-500 bg-purple-900/20 text-purple-300',
  'Classified': 'border-pink-500 bg-pink-900/20 text-pink-300',
  'Convert': 'border-red-500 bg-red-900/20 text-red-300',
  'Exceedingly Rare': 'border-yellow-500 bg-yellow-900/20 text-yellow-300',
}

const rarityChances = {
  'Mil-Spec Grade': 0.5, 
  'Restricted': 0.2,
  'Classified': 0.15,
  'Convert': 0.1,
  'Exceedingly Rare': 0.05
}

const lootTable = []
  items.forEach(item => {
    const chance = rarityChances[item.rarity] || 0;
    const weight = chance * 10000;
    for (let i = 0; i < weight; i++ ) {}
  });


function App() {
  const [reelItems, setReelItems] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonItem, setWonItem] = useState(null);
  const swiperRef = useRef(null);
  
  const prizeIndex = 25; 
  const totalItems = 40;

  const openCase = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonItem(null);

    const itemsForReel = Array.from({ length: totalItems }, (_, i) => ({
      ...items[Math.floor(Math.random() * items.length)],
      uniqueId: `${Date.now()}-${i}`
    }));

    const finalWonItem = {
      ...lootTable[Math.floor(Math.random()* items.length)],
      uniqueId: `${Date.now()}-${i}`  
    };

    itemsForReel[prizeIndex] = finalWonItem;
    setReelItems(itemsForReel);

    setTimeout(() => {
      setIsSpinning(false);
      setWonItem(finalWonItem);
    }, 4000);
  };

  useEffect(() => {
    if (reelItems.length === 0 || !isSpinning) return;

    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      setTimeout(() => {
        swiper.update();
        swiper.slideTo(0, 0);
        setTimeout(() => {
          swiper.slideTo(prizeIndex, 3500, false);
        }, 50);
      }, 100);
    }
  }, [isSpinning, reelItems]); 

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="bg-slate-800 p-8 rounded-lg shadow-2xl text-center max-w-4xl w-full">
        
        <h1 className="text-4xl font-bold text-sky-400 mb-2">Simulador de Caixa</h1>
        <p className="text-slate-400 mb-6">Construído com Swiper.js e Twind!</p>

        <div className="relative w-full h-40 mb-6">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-sky-400 z-10 rounded-full opacity-75 shadow-lg shadow-sky-400/50"></div>
          
          {reelItems.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="h-36 w-36 flex items-center justify-center text-slate-500 border-2 border-dashed border-slate-600 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎁</div>
                  <div className="text-sm">Clique para abrir!</div>
                </div>
              </div>
            </div>
          ) : (
            <Swiper
              ref={swiperRef}
              spaceBetween={10}
              slidesPerView="auto"
              centeredSlides={true}
              allowTouchMove={false}
              watchOverflow={true}
              className="h-full"
              style={{'--swiper-wrapper-transition-timing-function': 'cubic-bezier(0.1, 0.7, 0.3, 1)'}}
            >
              {reelItems.map((item) => (
                <SwiperSlide key={item.uniqueId} className="!w-36">
                  <div 
                    className={`h-36 w-36 flex flex-col items-center justify-center rounded-lg p-3 text-center transition-all duration-300 border-2
                                ${wonItem && wonItem.uniqueId === item.uniqueId && !isSpinning 
                                  ? 'scale-110 shadow-xl shadow-yellow-500/50 animate-pulse' 
                                  : ''
                                }
                                ${rarities[item.rarity] || 'border-gray-400 bg-gray-900/20'}`}
                  >
                    <img src={item.icon_url} alt={item.name} className="w-24 h-24 object-contain mb-2"/>
                    <p className="text-xs font-semibold leading-tight line-clamp-2">{item.name}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {wonItem && !isSpinning && (
          <div className="mb-6 p-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border-2 border-yellow-500 animate-pulse">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎉 Parabéns! Você ganhou:</h2>
            <div className="bg-slate-700 p-4 rounded-lg inline-flex flex-col items-center gap-4">
              <img src={wonItem.icon_url} alt={wonItem.name} className="w-28 h-28 object-contain"/>
              <div>
                <div className="text-xl font-bold text-white mb-1">{wonItem.name}</div>
                <div className={`text-sm font-semibold ${rarityClasses[wonItem.rarity]?.split(' ')[2] || 'text-gray-400'}`}>
                  {wonItem.rarity}
                </div>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={openCase}
          disabled={isSpinning}
          className={`px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200 transform
                      ${isSpinning 
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
                        : 'bg-sky-500 text-slate-900 hover:bg-sky-400 hover:scale-105 active:scale-95 shadow-lg hover:shadow-sky-500/50'
                      }`}
        >
          {isSpinning ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Abrindo...
            </span>
          ) : (
            'Abrir Caixa'
          )}
        </button>

        <div className="mt-6 text-xs text-slate-500">
          <p>Pressione o botão para simular a abertura de uma caixa</p>
          <p className="mt-1">Cada item tem chances diferentes baseadas na raridade</p>
        </div>
      </div>
    </div>
  );
}

export default App;
