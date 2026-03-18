import { Section } from './types';

export const SECTIONS: Section[] = [
  {
    id: 'survey',
    title: '1. 簡報基本設定 (調查)',
    fields: [
      {
        id: 'pages',
        label: '預計簡報頁數 (張)',
        type: 'number',
        placeholder: '10',
      },
      {
        id: 'time',
        label: '預計報告時間 (分鐘)',
        type: 'number',
        placeholder: '15',
      },
      {
        id: 'role',
        label: '簡報角色',
        type: 'select',
        options: [
          '專業顧問',
          '資深業界專家',
          '產品經理',
          '導覽員與解說員',
          '老師與講師',
          '自訂角色',
          '不需要角色',
        ],
        customId: 'customRole',
      },
      {
        id: 'scene',
        label: '簡報發表場景',
        type: 'select',
        options: [
          '現場提案會議',
          '線上視訊會議',
          '大型演講廳',
          '內部團隊小會',
          '學校課堂與研討會',
          '電梯簡報',
          '自訂設定',
          '不需要設定',
        ],
        customId: 'customScene',
      },
      {
        id: 'audience',
        label: '目標受眾 (對誰報告)',
        type: 'select',
        options: [
          '潛在客戶與決策者',
          '內部團隊與主管',
          '一般大眾與消費者',
          '學生與學術人員',
          '專業技術人員',
          '自訂設定',
          '不需要設定',
        ],
        customId: 'customAudience',
      },
      {
        id: 'tone',
        label: '講者語氣與人設',
        type: 'select',
        options: [
          '專業自信且具說服力',
          '輕鬆幽默且平易近人',
          '嚴謹客觀且數據驅動',
          '充滿熱情與激勵性',
          '溫暖感性且具同理心',
          '自訂設定',
          '不需要設定',
        ],
        customId: 'customTone',
      },
      {
        id: 'cta',
        label: '核心行動呼籲 (CTA)',
        type: 'select',
        options: [
          '了解痛點並促成合作',
          '批准預算與專案啟動',
          '購買產品或服務',
          '改變觀念或行為',
          '引起興趣',
          '無特定目的',
          '自訂設定',
          '不需要設定',
        ],
        customId: 'customCta',
      },
      {
        id: 'speakerNotes',
        label: '講者備註 (Speaker Notes)',
        type: 'radio',
        options: ['需要', '不需要'],
      },
      {
        id: 'extraInfo',
        label: '補充說明 (自由填寫)',
        type: 'textarea',
        placeholder: '例如：請著重介紹產品的 AI 自動化功能...',
      },
    ],
  },
  {
    id: 'purpose_section',
    title: '2. 簡報目的 / 類型',
    fields: [
      {
        id: 'purpose',
        label: '簡報目的 / 類型',
        type: 'select',
        options: [
          '商業提案 (Pitch Deck)',
          '教育與員工培訓',
          '專案與進度報告',
          '產品發表會',
          '數據與成效分析',
          '行銷企劃與發想',
          '自訂簡報目的',
        ],
        customId: 'customPurpose',
      },
    ],
  },
  {
    id: 'logic_section',
    title: '3. 簡報大綱架構',
    fields: [
      {
        id: 'logic',
        label: '簡報大綱架構',
        type: 'select',
        options: [
          '問題與解決方案',
          '起承轉合 (故事法)',
          '時間軸演進',
          '金字塔原則 (SCQA)',
          '結論與數據先行',
          '自訂大綱邏輯',
        ],
        customId: 'customLogic',
      },
    ],
  },
  {
    id: 'visual_section',
    title: '4. 建議視覺風格',
    fields: [
      {
        id: 'visualStyle',
        label: '建議視覺風格',
        type: 'select',
        options: [
          '手繪日記風格',
          '專業企業商務風格',
          '溫馨插畫風格',
          '高對比度極簡風格',
          '2.5D 等距視角風格',
          '3D 奶油 UI 科技風格',
          '雜誌編輯風格',
          '自訂視覺風格',
        ],
        customId: 'customVisualStyle',
      },
    ],
  },
  {
    id: 'character_section',
    title: '5. 主角設定',
    fields: [
      {
        id: 'character',
        label: '主角設定',
        type: 'select',
        options: [
          '不需要主角',
          '溫柔專業導覽員',
          '活潑可愛小助手',
          '資深業界專家',
          '自訂主角',
        ],
        customId: 'customCharacter',
      },
    ],
  },
];

export const RECOMMENDATIONS: Record<string, { logic: string; visualStyle: string; character: string }> = {
  '教育與員工培訓': {
    logic: '金字塔原則 (SCQA)',
    visualStyle: '手繪日記風格',
    character: '溫柔專業導覽員',
  },
  '商業提案 (Pitch Deck)': {
    logic: '問題與解決方案',
    visualStyle: '2.5D 等距視角風格',
    character: '資深業界專家',
  },
  '專案與進度報告': {
    logic: '時間軸演進',
    visualStyle: '高對比度極簡風格',
    character: '不需要主角',
  },
  '產品發表會': {
    logic: '起承轉合 (故事法)',
    visualStyle: '3D 奶油 UI 科技風格',
    character: '活潑可愛小助手',
  },
  '數據與成效分析': {
    logic: '結論與數據先行',
    visualStyle: '專業企業商務風格',
    character: '不需要主角',
  },
  '行銷企劃與發想': {
    logic: '起承轉合 (故事法)',
    visualStyle: '雜誌編輯風格',
    character: '不需要主角',
  },
};

export const CHARACTER_SUFFIX = `
1. 角色身分：溫柔、專業的導覽員，負責引導觀眾。
2. 全域設定：確保【主角】在每頁出現，維持背景連貫。
3. 風格連貫：精確維持 3D/手繪比例與特徵，不可變動。
4. 畫面配置：角色固定於側邊，嚴禁遮擋投影片文字。
5. 指引互動：具備指引手勢，引導受眾聚焦當前重點。
6. 解說姿態：呈現熱情生動的姿勢，提升信任感。`;
