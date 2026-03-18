import React, { useState, useMemo, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  RefreshCw, 
  Sparkles,
  Zap,
  BookOpen,
  FileText,
  BarChart3,
  Share2,
  Edit3,
  GitBranch,
  Route,
  History,
  Layout,
  BarChart,
  Edit,
  Smile,
  Monitor,
  Heart,
  Layers,
  Box,
  Book,
  User,
  Users,
  MessageSquare,
  Target,
  Presentation,
  Clock,
  Layers as LayersIcon,
  Plus,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SECTIONS, CHARACTER_SUFFIX, RECOMMENDATIONS } from './constants';
import { PromptState } from './types';
import { TRANSLATIONS } from './translations';

const ICON_MAP: Record<string, any> = {
  // Purposes
  '商業提案': Zap,
  '教育與員工培訓': BookOpen,
  '專案與進度報告': FileText,
  '產品發表會': Sparkles,
  '數據與成效分析': BarChart3,
  '行銷企劃與發想': Share2,
  '自訂簡報目的': Edit3,

  // Logic
  '問題與解決方案': GitBranch,
  '起承轉合 (故事法)': Route,
  '時間軸演進': History,
  '金字塔原則 (SCQA)': Layout,
  '結論與數據先行': BarChart,
  '自訂大綱邏輯': Edit,

  // Visual
  '手繪日記風格+主角': Smile,
  '專業企業商務風格': Monitor,
  '溫馨插畫風格': Heart,
  '高對比度極簡風格': Layers,
  '2.5D 等距視角風格+主角': Box,
  '3D 奶油 UI 科技風格': Box,
  '雜誌編輯風格': Book,
  '自訂視覺風格': Edit3,

  // Character
  '不需要主角': User,
  '溫柔專業導覽員': User,
  '活潑可愛小助手': User,
  '資深業界專家': User,
  '自訂主角': User,

  // Survey Icons
  'pages': LayersIcon,
  'time': Clock,
  'role': User,
  'scene': Presentation,
  'audience': Users,
  'tone': MessageSquare,
  'cta': Target,
};

const INITIAL_STATE: PromptState = {
  language: '繁體中文',
  pages: '10',
  time: '15',
  purpose: '商業提案 (Pitch Deck)',
  customPurpose: '',
  logic: '問題與解決方案',
  customLogic: '',
  cta: '了解痛點並促成合作',
  customCta: '',
  role: '不需要角色',
  customRole: '',
  scene: '現場提案會議',
  customScene: '',
  audience: '潛在客戶與決策者',
  customAudience: '',
  tone: '專業自信且具說服力',
  customTone: '',
  visualStyle: '2.5D 等距視角風格',
  customVisualStyle: '',
  character: '資深業界專家',
  customCharacter: '',
  speakerNotes: true,
  extraInfo: '',
};

const CHARACTER_SUFFIX_EN = `
1. [Character Identity]: Gentle, professional guide responsible for leading the audience.
2. [Global Setting]: Ensure the [Main Character] appears on every page to maintain background continuity.
3. [Style Consistency]: Precisely maintain 3D/hand-drawn proportions and features, no changes allowed.
4. [Screen Layout]: Character fixed on the side, strictly forbidden from blocking slide text.
5. [Guiding Interaction]: Equipped with guiding gestures to help the audience focus on the current key points.
6. [Narrative Pose]: Present a passionate and vivid posture to enhance trust.`;

const translate = (val: string) => TRANSLATIONS[val] || val;

export default function App() {
  const [state, setState] = useState<PromptState>(INITIAL_STATE);
  const [copiedZh, setCopiedZh] = useState(false);
  const [copiedEn, setCopiedEn] = useState(false);
  const [needVisualStyle, setNeedVisualStyle] = useState(true);

  const handleCopyZh = () => {
    const prompt = generatePromptZh();
    navigator.clipboard.writeText(prompt);
    setCopiedZh(true);
    setTimeout(() => setCopiedZh(false), 2000);
  };

  const handleCopyEn = () => {
    const prompt = generatePromptEn();
    navigator.clipboard.writeText(prompt);
    setCopiedEn(true);
    setTimeout(() => setCopiedEn(false), 2000);
  };

  const generatePromptZh = () => {
    const {
      language, pages, time, purpose, customPurpose, logic, customLogic,
      cta, customCta, role, customRole, scene, customScene, audience,
      customAudience, tone, customTone, visualStyle, customVisualStyle, character, customCharacter, speakerNotes, extraInfo
    } = state;

    const roleMap: Record<string, string> = {
      '專業顧問': '你現在的角色是一位具備多年實戰經驗的「專業顧問」。',
      '資深業界專家': '你是一位該領域的「資深業界專家」，展現深厚的技術底蘊。',
      '產品經理': '你是一位「產品經理 (PM)」，專注於解決痛點與產品價值。',
      '導覽員與解說員': '你是一位親切的「導覽員」，負責帶領觀眾深入淺出理解內容。',
      '老師與講師': '你是一位「老師與講師」，使用具備啟發性、教育性的口吻。',
      '自訂角色': `你現在的角色是一位「${customRole}」。`,
    };

    const sceneMap: Record<string, string> = {
      '現場提案會議': '這份簡報將用於「現場提案會議」，視覺需大氣，文字需精煉。',
      '線上視訊會議': '針對「視訊會議」優化，確保字體清晰，每頁重點單一。',
      '大型演講廳': '適合「大型演講」，強調視覺衝擊力，文字極簡化。',
      '內部團隊小會': '對象為「內部成員」，口吻可以較直接，著重執行面資訊。',
      '學校課堂與研討會': '適合「教學場合」，強調邏輯推導與知識點的連結。',
      '電梯簡報': '需在極短時間內產出核心價值。',
      '自訂設定': `這份簡報將用於「${customScene}」。`,
    };

    const audienceMap: Record<string, string> = {
      '潛在客戶與決策者': '受眾為「決策者」，請強調投資報酬率 (ROI) 與商業價值。',
      '內部團隊與主管': '對象為「內部主管」，專注於執行進度、資源與風險控管。',
      '一般大眾與消費者': '使用「白話、生活化」的語言，避免艱澀術語，強調易讀性。',
      '學生與學術人員': '語氣需嚴謹且具邏輯性，強調引用來源與理論支持。',
      '專業技術人員': '可使用「專業術語與技術細節」，強調邏輯深度與規格。',
      '自訂設定': `受眾為「${customAudience}」。`,
    };

    const toneMap: Record<string, string> = {
      '專業自信且具說服力': '請使用「專業、自信且具強烈說服力」的語氣撰寫文字。',
      '輕鬆幽默且平易近人': '語氣請保持「輕鬆、幽默且友善」，拉近與觀眾的距離。',
      '嚴謹客觀且數據驅動': '語氣需「冷靜、客觀」，所有結論需由數據引導。',
      '充滿熱情與激勵性': '語氣需「充滿正能量與號召力」，帶動受眾的情緒。',
      '溫暖感性且具同理心': '語氣需「感性且溫潤」，側重於情感連結與故事感。',
      '自訂設定': `語氣請保持「${customTone}」。`,
    };

    const purposeMap: Record<string, string> = {
      '商業提案': '這是一份「商業提案」，重點在於市場價值與競爭優勢。',
      '教育與員工培訓': '這是一份「培訓教材」，請注重知識拆解與互動性。',
      '專案與進度報告': '這是一份「進度更新」，強調里程碑達成率與後續計畫。',
      '產品發表會': '這是一份「產品發表」，營造亮點並強調新功能帶來的改變。',
      '數據與成效分析': '這是一份「數據報告」，請利用趨勢分析來支撐結論。',
      '行銷企劃與發想': '著重於「創意與策略」，文字需具備渲染力。',
      '自訂簡報目的': `這是一份「${customPurpose}」。`,
    };

    const logicMap: Record<string, string> = {
      '金字塔原則 (SCQA)': '請嚴格遵守 SCQA 架構：情境、衝突、問題、解決方案。',
      '問題與解決方案': '邏輯為：痛點分析 -> 核心問題 -> 解決對策 -> 預期效益。',
      '起承轉合 (故事法)': '使用故事敘事法，由淺入深帶動情感，最後達成結論。',
      '時間軸演進': '按照「過去、現在、未來」的時間邏輯組織內容。',
      '結論與數據先行': '採用「結論先行」邏輯，先說結果，再用數據輔助理由。',
      '自訂大綱邏輯': `邏輯為：${customLogic}。`,
    };

    const ctaMap: Record<string, string> = {
      '了解痛點並促成合作': '簡報最終目標是引導受眾「了解痛點並產生合作意願」。',
      '批准預算與專案啟動': '目標是獲得受眾的支持，進而「批准預算或啟動專案」。',
      '購買產品或服務': '強調轉換率，引導受眾產生「購買或訂閱」的具體行動。',
      '改變觀念或行為': '目標是「驅動思想轉變或生活習慣的改變」。',
      '引起興趣': '目標是「引起受眾的興趣與關注」。',
      '自訂設定': `簡報最終目標是「${customCta}」。`,
    };

    const visualMap: Record<string, string> = {
      '手繪日記風格': '視覺採用「手繪日記風」。所有畫面需具備溫暖手寫感。',
      '專業企業商務風格': '視覺採用「商務風」。色調深藍、排版嚴謹、大量矩形色塊。',
      '溫馨插畫風格': '視覺採用「軟萌插畫風」。色彩柔和、造型圓圓、無壓力感。',
      '高對比度極簡風格': '視覺採用「黑白極簡風」。強調空間與文字對齊，無裝飾。',
      '2.5D 等距視角風格': '視覺採用「2.5D 立體風」。強調空間透視感與科技現代感。',
      '3D 奶油 UI 科技風格': '視覺採用「3D 奶油光影風」。具備軟材質質感與未來感。',
      '雜誌編輯風格': '視覺採用「平面雜誌排版」。重視大面積留白與美感字體。',
      '自訂視覺風格': `視覺採用「${customVisualStyle}」。`,
    };

    const characterMap: Record<string, string> = {
      '溫柔專業導覽員': '角色設定為「溫柔專業的導覽員」，負責引導觀眾。',
      '活潑可愛小助手': '角色設定為「活潑可愛的小助手」，增加親和力與趣味性。',
      '資深業界專家': '角色設定為「資深業界專家」，展現權威性與專業度。',
      '自訂主角': `角色設定為「${customCharacter}」。`,
    };

    let prompt = `請為我生成一份專業簡報大綱與內容。
  
  【基本設定】
  - 語系：${language}
  - 預計頁數：請生成總共 ${pages} 張投影片的內容。
  - 報告時間：內容深度請控制在 ${time} 分鐘的報告時數內，節奏需明快。
  
  【內容核心】
  - 簡報目的：${purposeMap[purpose] || (purpose === '自訂簡報目的' ? `這是一份「${customPurpose}」。` : purpose)}
  - 大綱邏輯：${logicMap[logic] || (logic === '自訂大綱邏輯' ? `邏輯為：${customLogic}。` : logic)}
  ${cta !== '不需要設定' ? `- 核心行動呼籲 (CTA)：${ctaMap[cta] || (cta === '自訂設定' ? `簡報最終目標是「${customCta}」。` : cta)}` : ''}
  
  【角色與受眾】
  ${role !== '不需要角色' ? `- 你的角色：${roleMap[role] || (role === '自訂角色' ? `你現在的角色是一位「${customRole}」。` : role)}` : ''}
  ${scene !== '不需要設定' ? `- 發表場景：${sceneMap[scene] || (scene === '自訂設定' ? `這份簡報將用於「${customScene}」。` : scene)}` : ''}
  ${audience !== '不需要設定' ? `- 目標受眾：${audienceMap[audience] || (audience === '自訂設定' ? `受眾為「${customAudience}」。` : audience)}` : ''}
  ${tone !== '不需要設定' ? `- 語氣人設：${toneMap[tone] || (tone === '自訂設定' ? `語氣請保持「${customTone}」。` : tone)}` : ''}
  
  ${needVisualStyle ? `【視覺風格建議】
  - 視覺風格：${visualMap[visualStyle] || (visualStyle === '自訂視覺風格' ? `視覺採用「${customVisualStyle}」。` : visualStyle)}
  ${character !== '不需要主角' ? `\n- 主角設定：${characterMap[character] || (character === '自訂主角' ? `角色設定為「${customCharacter}」。` : character)}\n角色視覺指令：${CHARACTER_SUFFIX}` : ''}` : ''}
 
 【進階補充】
 - 講者備註：${speakerNotes ? '需要' : '不需要'}
 ${extraInfo ? `- 額外資訊：${extraInfo}` : ''}
 
 請根據以上設定，提供完整的簡報架構、各頁標題、內容核心要點${speakerNotes ? '以及講者備註' : ''}。`;

    return prompt;
  };

  const generatePromptEn = () => {
    const {
      language, pages, time, purpose, customPurpose, logic, customLogic,
      cta, customCta, role, customRole, scene, customScene, audience,
      customAudience, tone, customTone, visualStyle, customVisualStyle, character, customCharacter, speakerNotes, extraInfo
    } = state;

    const finalPurpose = purpose === '自訂簡報目的' ? customPurpose : translate(purpose);
    const finalLogic = logic === '自訂大綱邏輯' ? customLogic : translate(logic);
    const finalCta = cta === '自訂設定' ? customCta : (cta === '不需要設定' ? '' : translate(cta));
    const finalRole = role === '自訂角色' ? customRole : (role === '不需要角色' ? '' : translate(role));
    const finalScene = scene === '自訂設定' ? customScene : (scene === '不需要設定' ? '' : translate(scene));
    const finalAudience = audience === '自訂設定' ? customAudience : (audience === '不需要設定' ? '' : translate(audience));
    const finalTone = tone === '自訂設定' ? customTone : (tone === '不需要設定' ? '' : translate(tone));

    let finalVisualStyle = visualStyle;
    if (visualStyle === '自訂視覺風格') finalVisualStyle = customVisualStyle;
    else finalVisualStyle = translate(finalVisualStyle);

    let finalCharacter = character;
    if (character === '自訂主角') finalCharacter = customCharacter;
    else if (character !== '不需要主角') finalCharacter = translate(character);

    let prompt = `Please generate a professional presentation outline and content for me.
  
  [Basic Settings]
  - Language: ${translate(language)}
  - Expected Pages: Please generate content for a total of ${pages} slides.
  - Presentation Time: Please control the depth of content within ${time} minutes of reporting time, with a fast pace.
  
  [Core Content]
  - Presentation Purpose: This is a "${finalPurpose}" presentation.
  - Outline Logic: Logic is: ${finalLogic}.
  ${finalCta ? `- Call to Action (CTA): The ultimate goal is to lead the audience to "${finalCta}".` : ''}
  
  [Role & Audience]
  ${finalRole ? `- Your Role: Your current role is a "${finalRole}".` : ''}
  ${finalScene ? `- Scene: This presentation will be used for "${finalScene}".` : ''}
  ${finalAudience ? `- Target Audience: The audience is "${finalAudience}".` : ''}
  ${finalTone ? `- Tone & Persona: Please maintain a "${finalTone}" tone.` : ''}
  
  ${needVisualStyle ? `[Visual Style Suggestions]
  - Visual Style: Visual style is "${finalVisualStyle}".
  ${character !== '不需要主角' ? `\n- Character Setting: Character is "${finalCharacter}".\nCharacter Visual Instructions: ${CHARACTER_SUFFIX_EN}` : ''}` : ''}
 
 [Advanced Supplements]
 - Speaker Notes: ${speakerNotes ? 'Please provide detailed speaker notes for each slide.' : 'Not Required.'}
 ${extraInfo ? `- Special Requirements: [${extraInfo}].` : ''}
 
 Based on the above settings, please provide a complete presentation structure, titles for each page, core content points, ${speakerNotes ? 'and speaker notes' : ''}.`;

    return prompt;
  };

  const promptZh = useMemo(() => generatePromptZh(), [state]);
  const promptEn = useMemo(() => generatePromptEn(), [state]);

  const updateField = (id: keyof PromptState, value: any) => {
    setState(prev => {
      const newState = { ...prev, [id]: value };
      
      // Auto-recommendation logic
      if (id === 'purpose' && RECOMMENDATIONS[value]) {
        newState.logic = RECOMMENDATIONS[value].logic;
        newState.visualStyle = RECOMMENDATIONS[value].visualStyle;
        newState.character = RECOMMENDATIONS[value].character;
      }
      
      return newState;
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-pink-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-pink-500 p-1.5 rounded-lg shadow-lg shadow-pink-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              AI 簡報 Prompt 生成器
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setState(INITIAL_STATE)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
              title="Reset"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Section 1: Survey */}
        {SECTIONS.filter(s => s.id === 'survey').map((section) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F1117] rounded-2xl border border-white/5 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-white/5 bg-white/5">
              <h2 className="text-lg font-bold text-pink-500 tracking-tight">
                {section.title}
              </h2>
            </div>
            <div className="p-6 space-y-8">
              {/* Row 1: 4 columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {section.fields.slice(0, 4).map((field) => (
                  <div key={field.id} className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-tight block">
                      {field.label}
                    </label>
                    <div className="relative">
                      {ICON_MAP[field.id] && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          {React.createElement(ICON_MAP[field.id], { size: 16 })}
                        </div>
                      )}
                      {field.type === 'number' ? (
                        <input
                          type="number"
                          placeholder={field.placeholder}
                          value={state[field.id] as string}
                          onChange={(e) => updateField(field.id, e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 bg-[#1A1D26] border border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-sm text-white"
                        />
                      ) : (
                        <div className="relative">
                          <select
                            value={state[field.id] as string}
                            onChange={(e) => updateField(field.id, e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 bg-[#1A1D26] border border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-sm text-white appearance-none cursor-pointer"
                          >
                            {field.options?.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <ChevronRight size={16} className="rotate-90" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2: 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {section.fields.slice(4, 7).map((field) => (
                  <div key={field.id} className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-tight block">
                      {field.label}
                    </label>
                    <div className="relative">
                      {ICON_MAP[field.id] && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          {React.createElement(ICON_MAP[field.id], { size: 16 })}
                        </div>
                      )}
                      <div className="relative">
                        <select
                          value={state[field.id] as string}
                          onChange={(e) => updateField(field.id, e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 bg-[#1A1D26] border border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-sm text-white appearance-none cursor-pointer"
                        >
                          {field.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                          <ChevronRight size={16} className="rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 3: 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4 space-y-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-tight block">
                    {section.fields[7].label}
                  </label>
                  <div className="flex gap-3">
                    {section.fields[7].options?.map(opt => (
                      <button
                        key={opt}
                        onClick={() => updateField(section.fields[7].id as any, opt === '需要')}
                        className={`flex-1 py-3 px-4 rounded-xl border font-bold transition-all flex items-center justify-center gap-2 ${
                          (opt === '需要' ? state.speakerNotes : !state.speakerNotes)
                            ? 'bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/20'
                            : 'bg-[#1A1D26] border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {opt === '需要' ? <Check size={18} className="text-emerald-400" /> : <span className="text-red-500">✕</span>}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-8 space-y-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-tight block">
                    {section.fields[8].label}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-4 text-gray-500">
                      <Plus size={16} />
                    </div>
                    <textarea
                      placeholder={section.fields[8].placeholder}
                      rows={1}
                      value={state.extraInfo}
                      onChange={(e) => updateField('extraInfo', e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-[#1A1D26] border border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all resize-none text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* Sections 2, 3, 4, 5: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SECTIONS.filter(s => s.id !== 'survey').map((section, sIdx) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sIdx * 0.1 }}
              className="bg-[#0F1117] rounded-2xl border border-white/5 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 border-b border-white/5 bg-white/5">
                <h2 className="text-lg font-bold text-pink-500 tracking-tight">
                  {section.title}
                </h2>
              </div>
              <div className="p-6 flex-1 space-y-4">
                {section.id === 'visual_section' && (
                  <div className="flex gap-3 mb-6">
                    {['需要', '不需要'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setNeedVisualStyle(opt === '需要')}
                        className={`flex-1 py-3 px-4 rounded-xl border font-bold transition-all flex items-center justify-center gap-2 ${
                          (opt === '需要' ? needVisualStyle : !needVisualStyle)
                            ? 'bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/20'
                            : 'bg-[#1A1D26] border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {opt === '需要' ? <Check size={18} className="text-emerald-400" /> : <span className="text-red-500">✕</span>}
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                <div className={`space-y-3 ${(section.id === 'visual_section' || section.id === 'character_section') && !needVisualStyle ? 'opacity-20 pointer-events-none' : ''}`}>
                  {section.fields[0].options?.map(opt => {
                    const Icon = ICON_MAP[opt] || Edit3;
                    const isSelected = state[section.fields[0].id as keyof PromptState] === opt;
                    const isRecommended = RECOMMENDATIONS[state.purpose] && 
                                         (RECOMMENDATIONS[state.purpose] as any)[section.fields[0].id] === opt;

                    return (
                      <button
                        key={opt}
                        onClick={() => updateField(section.fields[0].id as any, opt)}
                        className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-4 relative group ${
                          isSelected
                            ? 'bg-white/5 border-pink-500/50 text-white ring-1 ring-pink-500/50'
                            : 'bg-transparent border-white/5 text-gray-500 hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-colors ${
                          isSelected ? 'bg-pink-500/20 text-pink-500' : 'bg-white/5 text-gray-600 group-hover:text-gray-400'
                        }`}>
                          <Icon size={20} />
                        </div>
                        <span className="text-sm font-medium text-left flex-1">{opt}</span>
                        
                        {isRecommended && (
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                            isSelected ? 'bg-pink-500 text-white' : 'bg-pink-500/20 text-pink-500'
                          }`}>
                            推薦
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {/* Custom Input Fields */}
                  <AnimatePresence>
                    {(state.purpose === '自訂簡報目的' && section.id === 'purpose_section') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-2"
                      >
                        <input
                          type="text"
                          placeholder="請輸入自訂目的..."
                          value={state.customPurpose}
                          onChange={(e) => updateField('customPurpose', e.target.value)}
                          className="w-full px-4 py-3 bg-[#1A1D26] border border-pink-500/30 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-sm text-white"
                        />
                      </motion.div>
                    )}
                    {(state.logic === '自訂大綱邏輯' && section.id === 'logic_section') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-2"
                      >
                        <input
                          type="text"
                          placeholder="請輸入自訂大綱邏輯..."
                          value={state.customLogic}
                          onChange={(e) => updateField('customLogic', e.target.value)}
                          className="w-full px-4 py-3 bg-[#1A1D26] border border-pink-500/30 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-sm text-white"
                        />
                      </motion.div>
                    )}
                    {(state.visualStyle === '自訂視覺風格' && section.id === 'visual_section') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-2"
                      >
                        <input
                          type="text"
                          placeholder="請輸入自訂視覺風格..."
                          value={state.customVisualStyle}
                          onChange={(e) => updateField('customVisualStyle', e.target.value)}
                          className="w-full px-4 py-3 bg-[#1A1D26] border border-pink-500/30 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-sm text-white"
                        />
                      </motion.div>
                    )}
                    {(state.character === '自訂主角' && section.id === 'character_section') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-2"
                      >
                        <input
                          type="text"
                          placeholder="請輸入自訂主角描述..."
                          value={state.customCharacter}
                          onChange={(e) => updateField('customCharacter', e.target.value)}
                          className="w-full px-4 py-3 bg-[#1A1D26] border border-pink-500/30 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-sm text-white"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Results Section */}
        <div className="space-y-12">
          {/* Chinese Result */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 font-bold">2</div>
                <h2 className="text-2xl font-bold text-white tracking-tight">中文提示詞 (Chinese Prompt)</h2>
              </div>
              <button
                onClick={handleCopyZh}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all ${
                  copiedZh 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-pink-500 text-white hover:bg-pink-600 shadow-lg shadow-pink-500/20'
                }`}
              >
                {copiedZh ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedZh ? '已複製!' : '複製中文提示詞'}
              </button>
            </div>
            
            <div className="bg-[#0F1117] rounded-2xl shadow-2xl overflow-hidden border border-white/5">
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  Chinese Preview
                </span>
              </div>
              <div className="p-8">
                <div className="font-mono text-sm text-pink-200/80 leading-relaxed whitespace-pre-wrap min-h-[200px]">
                  {promptZh}
                </div>
              </div>
            </div>
          </div>

          {/* English Result */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 font-bold">3</div>
                <h2 className="text-2xl font-bold text-white tracking-tight">英文提示詞 (English Prompt)</h2>
              </div>
              <button
                onClick={handleCopyEn}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all ${
                  copiedEn 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-pink-500 text-white hover:bg-pink-600 shadow-lg shadow-pink-500/20'
                }`}
              >
                {copiedEn ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedEn ? 'Copied!' : 'Copy English Prompt'}
              </button>
            </div>
            
            <div className="bg-[#0F1117] rounded-2xl shadow-2xl overflow-hidden border border-white/5">
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  English Preview
                </span>
              </div>
              <div className="p-8">
                <div className="font-mono text-sm text-pink-200/80 leading-relaxed whitespace-pre-wrap min-h-[200px]">
                  {promptEn}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-8 border border-white/5 flex items-start gap-4">
          <Sparkles className="w-6 h-6 text-pink-500 shrink-0 mt-1" />
          <div>
            <h3 className="text-white font-bold text-lg mb-2">使用小撇步 (Tips)</h3>
            <p className="text-gray-400 leading-relaxed">
              將生成的提示詞複製後，貼上至 Gamma, ChatGPT 或 Claude 等 AI 工具。
              <br />
              <strong>中文提示詞</strong> 適合直接生成內容；<strong>英文提示詞</strong> 有時能獲得更精確的邏輯架構與視覺指令。
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-12 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            &copy; 2026 AI 簡報 Prompt 生成器. Designed for professional efficiency.
          </p>
        </div>
      </footer>
    </div>
  );
}
