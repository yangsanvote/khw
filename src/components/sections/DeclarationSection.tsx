'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ScrollIndicator from '../ScrollIndicator';
import { event } from '@/lib/gtag';

export default function DeclarationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fullText = `
존경하는 양주동면 주민 여러분, 그리고 양산시민 여러분.
안녕하십니까?
저는 이번 4월 2일 양주동면 시의원 보궐선거에 출마하는 정의당 권현우입니다.

2018년 이후 세 번의 선거에 도전했습니다. 2022년 선거를 치르고 나서는 이만 포기해야 하는 걸까 고민했습니다. 저 혼자만의 짝사랑이었던 것만 같았습니다. 조용히 지역에서 봉사하는 삶을 살아가겠다는 생각을 했습니다. 아파트에서 입주자대표 활동에 더욱 매진했습니다.

하지만 역설적으로, 입주자대표 활동을 깊이 하면 할 수록, 지금 우리에게 필요한 것이 바로 정치라는 것을 알게되었습니다. 제가 사는 청어람아파트에서는 경비원과 미화원들이 쉴 곳이 없어 아파트 지하에서 지내고 있습니다. 이것은 산업안전보건법 위반입니다. 하지만 민간아파트는 건설사들이 최대한의 이익을 뽑아내기 위해 용적률에 여유가 없습니다. 이 상황에서 아파트 노동자들을 위한 휴게실을 짓고자 하면, 그것은 용적률을 위반합니다. 사람의 선의 만으로는 해결되지 않는 것입니다. 이런 때 정치가 작동해야 합니다. 저는 양산시와는 용적률과 관련해서, 입주민들과는 휴게실 건립과 관련해서 원만한 합의를 이뤄내었고, 올해 초 아파트 노동자 휴게실 건립이 시작됩니다. 
아파트에 노인정이 있습니다. 저희 아파트 노인회에는 마음 좋고 손 크신 분들이 계셔서, 마을 내 어르신들을 매일 불러 내 밥 한끼를 먹이시곤 합니다. 이 노인회 어르신들의 손을 빌려, 마을과 주변 저소득 이웃에 김장김치와 반찬 봉사를 시작했습니다. 아파트에 작은도서관이 있습니다. 여기에 마을 사람들이 언제든 찾아와 지낼 수 있는 복합 문화공간을 만들어보자고 시작했던 일이, 마을 사랑방의 역할을 하게 되었고, 마을 주민과 아이들이 함께 어울리는 공간이 되었습니다. 저 역시 맞벌이를 하고 있지만, 마을에 맞벌이 부부가 많습니다. 둘째 아이까지 초등학교에 들어가면서, 돌봄이 결국 부모의 일자리와 직결된다는 것을 체감하게 됐고 우리마을아이돌봄센터를 운영하게 됐습니다. 이런 작은 시도들이 공동체 활성화 공모사업 선정과 같은 성과로 돌아오게 되고, 작게나마 함께 나누는 일자리가 되기도 했습니다.
아파트 사람들을 모아 헌혈 행사를 열려고 했더니 양산에는 헌혈의 집이 없었습니다. 그래서 주기적으로 헌혈버스를 부르던 일이, 양주동 전체로 번지고, 결국 양산에 헌혈의 집이 생겨나기까지 했습니다. 저는 항상 일회적인 이벤트를 하기보다는 처음에는 크게 보이지 않더라도 지속 가능한 일들을 만들어 내고자 했습니다. 그리고 결국 그것이 더 큰 결과를 가져온다는 것을 배웠습니다.
그 결과 청어람아파트는 작년말, 국토교통부 최우수 관리단지로 선정되었으며, 제7회 대한민국 주거복지문화대상에서 대상을 수상하였습니다. 결국 주거환경 개선은 단순히 아파트의 외장을 바꾸고, 더 비싼 집으로 이사를 가는 것이 아니라, 주거와 함께 돌봄이 이루어지고, 일자리를 만들어내며, 함께 성장할 수 있어야 한다는 것을 저는 우리 청어람아파트를 통해 배웠습니다.

아파트를 바꿔보겠다고 했더니, 저와 이웃의 삶이 바뀌었습니다. 결국 우리가 사는 곳을 바꾸고자 하면 우리의 삶이 바뀐다는 것을 알게 되었습니다. 그리고 우리의 삶을 바꾸는 그 것, 그것이 바로 정치라는 것을 알게 되었습니다. 정치를 제가 피하려 한다고 피할 수 있는 것이 아니라는 것, 우리의 삶을 바꾸려 한다면 결국 다시 맞닥뜨려야 하는 것이 정치라는 것을, 말이 아니라 피부로 느끼게 되었습니다. 
청어람아파트에서 이룬 이 변화들을, 이제는 양주동면 전체로 확장하고 싶습니다. 주거, 돌봄, 일자리가 함께 어우러지는 양주동과 동면을 만들겠습니다. 아파트로 전국 1등을 해 봤습니다. 이제는 양산시를 전국 1등으로 만들어 보겠습니다.

존경하는 양주동면 주민 여러분!
저 권현우, 이제 준비가 되었습니다.
실력으로 검증받았고, 현장에서 경험을 쌓았습니다. 이제는 양주동면의 변화를 이끌어낼 때입니다.
4월 2일, 권현우를 선택 해 주십시오. 양주동면의 새로운 미래, 제가 만들어내겠습니다. 양주 동면을 바꾸고, 양산을 바꾸고, 우리의 삶을 바꾸겠습니다. 
감사합니다.`;

  const handleOpenModal = () => {
    event({
      action: 'view_full_declaration',
      category: 'engagement',
      label: '전문보기 클릭'
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    event({
      action: 'close_full_declaration',
      category: 'engagement',
      label: '전문보기 닫기'
    });
    setIsModalOpen(false);
  };

  return (
    <section className="h-screen snap-start relative flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 px-4 py-8">
      <div className="w-full max-w-4xl mx-auto bg-white/95 rounded-2xl p-6 md:p-12 shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-3 md:mb-6"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-yellow-800 mb-1">출마선언문</h2>
          <p className="text-xl md:text-2xl text-yellow-700">정의당 권현우 양산시의원 출마 기자회견</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-3 md:space-y-6 text-gray-800"
        >
          <p className="text-lg md:text-xl">존경하는 양주동면 주민 여러분, 그리고 양산시민 여러분.</p>
          <p className="text-lg md:text-xl">안녕하십니까? 저는 이번 4월 2일 양산시의원 보궐선거에 출마하는 정의당 권현우입니다.</p>

          <div className="bg-yellow-50 p-4 md:p-6 rounded-xl my-4 md:my-8 border border-yellow-200">
            <p className="text-lg md:text-xl font-medium">주거, 돌봄, 일자리가 함께 어우러지는 양주동과 동면을 만들겠습니다.</p>
            <p className="text-lg md:text-xl font-medium">아파트로 전국 1등을 해 봤습니다.</p>
            <p className="text-lg md:text-xl font-medium">이제는 양산시를 전국 1등으로 만들어 보겠습니다.</p>
          </div>

          <p className="text-lg md:text-xl">실력으로 검증받았고, 현장에서 경험을 쌓았습니다.</p>
          <p className="text-lg md:text-xl">4월 2일, 권현우를 선택해 주십시오.</p>

          <div className="text-right mt-4 md:mt-8">
            <p className="text-lg md:text-xl font-semibold text-yellow-800">2025년 2월 13일</p>
            <p className="text-lg md:text-xl font-semibold text-yellow-800">권현우 올림</p>
          </div>
        </motion.div>

        <div className="text-center mt-4">
          <button
            onClick={handleOpenModal}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
          >
            전문 보기
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="prose prose-base">
              {fullText.split('\n').map((line, index) => (
                <p key={index} className="text-base md:text-lg mb-3">
                  {line || <br />}
                </p>
              ))}
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <ScrollIndicator isDark={false} className="bottom-8 md:bottom-8" />
    </section>
  );
} 