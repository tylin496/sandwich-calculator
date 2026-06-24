
function haptic() {
  if (navigator.vibrate) navigator.vibrate(8);
}

const data = {
main:{
"照燒雞肉":{cal:362,protein:27},
"厚切嫩牛":{cal:366,protein:26},
"鮮嫩雞柳":{cal:324,protein:25},
"香烤雞肉":{cal:331,protein:23},
"鮪魚":{cal:507,protein:22},
"義大利經典":{cal:409,protein:22},
"燒烤牛肉":{cal:346,protein:21},
"百味俱樂部":{cal:325,protein:21},
"義大利牛肉丸":{cal:383,protein:20},
"嫩切雞肉":{cal:300,protein:20},
"火腿":{cal:317,protein:19},
"哈燒起司總匯":{cal:321,protein:18},
"蛋沙拉":{cal:421,protein:17},
"墨西哥辣牛":{cal:320,protein:17},
"鷹嘴豆泥餅":{cal:425,protein:16},
"墨西哥手撕豬":{cal:321,protein:16},
"素食蔬菜":{cal:250,protein:10}
},

addon:{
"鮮嫩雞柳":{cal:74,protein:15},
"嫩切雞肉(3片)":{cal:50,protein:10},
"嫩切雞肉(1片)":{cal:17,protein:3},
"香烤雞肉":{cal:81,protein:13},
"照燒雞肉":{cal:112,protein:17},
"百味俱樂部":{cal:75,protein:10},
"厚切嫩牛":{cal:100,protein:13},
"燒烤牛肉(1片/19.5g)":{cal:32,protein:4},
"嫩煎蛋(1片)":{cal:41,protein:5},
"火腿(4片)":{cal:67,protein:8},
"火腿(1片)":{cal:17,protein:2},
"辣豆瓣嫩牛":{cal:157,protein:18},
"燒烤牛肉(3片/59g)":{cal:96,protein:11},
"哈燒起司總匯":{cal:71,protein:8},
"墨西哥辣牛":{cal:70,protein:7},
"培根(1條)":{cal:24,protein:2},
"墨西哥手撕豬":{cal:118,protein:9},
"義大利經典":{cal:159,protein:12},
"義大利牛肉丸":{cal:133,protein:10},
"切絲巧達起司":{cal:55,protein:3.3},
"英式切片起司(2片)":{cal:39,protein:2.3},
"義式辣香腸(1片)":{cal:18,protein:1},
"義式煙燻臘腸(1片)":{cal:24,protein:1},
"鮪魚":{cal:257,protein:12},
"酪梨泥(1球)":{cal:75,protein:1},
"蛋沙拉(1球)":{cal:86,protein:3.3},
"蛋沙拉(2球)":{cal:171,protein:6.5},
"鷹嘴豆泥餅(1顆)":{cal:58,protein:2},
"鷹嘴豆泥餅(3顆)":{cal:175,protein:6}
},

sauce:{
"千島醬":{cal:36.7},
"紅酒醋":{cal:0.3},
"美乃滋":{cal:100},
"甜蔥醬":{cal:33},
"鄉村醬":{cal:74},
"黃芥末":{cal:9},
"義大利油醋醬":{cal:14.8},
"蜂蜜芥末醬":{cal:21},
"墨西哥西南醬":{cal:66},
"橄欖油":{cal:44}
}
}

const mainNameMap = {
  "嫩切雞肉":"Sliced Chicken",
  "照燒雞肉":"Chicken Teriyaki",
  "鮮嫩雞柳":"Chicken Strips",
  "香烤雞肉":"Roasted Chicken Breast",
  "火腿":"Ham",
  "義大利牛肉丸":"Italian Meatballs",
  "燒烤牛肉":"Roast Beef",
  "墨西哥辣牛":"Taco Beef",
  "義大利經典":"Italian B.M.T.",
  "百味俱樂部":"Subway Club",
  "哈燒起司總匯":"Subway Melt",
  "鮪魚":"Tuna",
  "蛋沙拉":"Egg Mayo",
  "素食蔬菜":"Veggie Delight",
  "厚切嫩牛":"Diced Beef",
  "鷹嘴豆泥餅":"Falafel",
  "辣豆瓣嫩牛":"Mala Beef",
  "雙重起司厚牛":"Double Cheese Steak",
  "墨西哥手撕豬":"Mexican Pulled Pork"
}

const sauceNameMap = {
  "墨西哥西南醬":"Chipotle Southwest",
  "黃芥末":"Yellow Mustard",
  "獨家秘方義大利番茄醬":"Marinara",
  "甜蔥醬":"Sweet Onion",
  "蜂蜜芥末醬":"Honey Mustard",
  "美乃滋":"Mayonnaise",
  "橄欖油":"Olive Oil",
  "紅酒醋":"Red Wine Vinegar",
  "義大利油醋醬":"Italian Dressing",
  "千島醬":"Thousand Island",
  "鄉村醬":"Ranch",
  "墨西哥辣椒起司醬":"Jalapeno Cheese Sauce"
}

// 主餐名稱與加料表 key 不同時的對應（用於雙份肉計算）
const doubleMeatMap = {
  "燒烤牛肉": "燒烤牛肉(3片/59g)",
  "嫩切雞肉": "嫩切雞肉(3片)",
  "火腿":     "火腿(4片)",
  "蛋沙拉":   "蛋沙拉(2球)",
  "鷹嘴豆泥餅": "鷹嘴豆泥餅(3顆)",
}

const NO_SAUCE_LABEL = "不加醬 No sauce"
let lastShareText = ""
let copyShareResetTimer = null
let suppressPickerTapUntil = 0
const RECENT_LIMIT = 3
const RECENT_KEYS = {
  main: "recent_main",
  addon: "recent_addon",
  sauce: "recent_sauce"
}
const RECENT_COUNT_KEYS = {
  main: "recent_count_main",
  addon: "recent_count_addon",
  sauce: "recent_count_sauce"
}
const SWIPE_HINT_KEYS = {
  main: "swipe_hint_seen_main",
  addon: "swipe_hint_seen_addon",
  sauce: "swipe_hint_seen_sauce"
}
const MODAL_IDS = ["mainModal", "addonModal", "sauceModal", "quickSearchModal", "historyModal"]
const HISTORY_KEY = "combo_history"
const HISTORY_LIMIT = 8
const MODAL_ANIM_MS = 340

function setModalOpenState(){
  const hasOpenModal = MODAL_IDS.some(id => {
    const modal = document.getElementById(id)
    return modal && (modal.classList.contains("is-open") || modal.style.display === "block")
  })
  document.body.classList.toggle("modal-open", hasOpenModal)
}

function openModal(id, focusEl = null){
  MODAL_IDS.forEach((mid)=>{
    if(mid !== id) closeModal(mid, { immediate: true })
  })

  const modal = document.getElementById(id)
  if(!modal) return
  modal.style.display = "block"
  void modal.offsetWidth
  requestAnimationFrame(()=>{
    modal.classList.add("is-open")
  })
  // Mark as freshly opened so list items get a one-time staggered entry.
  // Removed after the stagger window so search re-renders don't replay it.
  modal.classList.add("just-opened")
  clearTimeout(modal._justOpenedTimer)
  modal._justOpenedTimer = setTimeout(()=>{
    modal.classList.remove("just-opened")
  }, 480)
  setModalOpenState()

  const panel = modal.querySelector(".sheet-panel")
  if(panel) panel.style.transform = ""

  setTimeout(()=>{
    if(focusEl){
      focusEl.focus()
    } else if(panel) {
      panel.focus()
    }
  }, MODAL_ANIM_MS * 0.45)
}

function closeModal(id, options = {}){
  const modal = document.getElementById(id)
  if(!modal || modal.style.display === "none") return

  const panel = modal.querySelector(".sheet-panel")
  if(panel && !options.immediate) panel.style.transform = ""

  if(options.immediate){
    modal.classList.remove("is-open")
    modal.style.display = "none"
    setModalOpenState()
    return
  }

  modal.classList.remove("is-open")
  setTimeout(()=>{
    if(!modal.classList.contains("is-open")){
      modal.style.display = "none"
      setModalOpenState()
    }
  }, MODAL_ANIM_MS)
}

function closeAllModals(options = {}){
  MODAL_IDS.forEach(id => closeModal(id, options))
}

function makeKeyboardClickable(el){
  if(!el || el.dataset.keyboardClickable === "1") return
  el.dataset.keyboardClickable = "1"
  if(!el.hasAttribute("role")) el.setAttribute("role", "button")
  if(!el.hasAttribute("tabindex")) el.tabIndex = 0
  el.addEventListener("keydown", (e)=>{
    if(e.key !== "Enter" && e.key !== " ") return
    e.preventDefault()
    el.click()
  })
}

document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape"){
    closeAllModals()
  }
})

document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll(".picker-field").forEach(makeKeyboardClickable)
})

function escapeHtml(str){
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function shouldBreakModalBilingualLine(zh, en){
  if(!zh || !en) return false
  return (zh.length + en.length >= 30) || en.length >= 22
}

function setBilingualPickerText(el, zh, en){
  if(!el) return
  el.classList.remove("picker-field--bilingual-break")
  if(!en){
    el.textContent = zh || ""
    return
  }
  el.innerHTML = `<span class="picker-bilingual"><span class="picker-zh-inline">${escapeHtml(zh)}</span> <span class="picker-en-inline">${escapeHtml(en)}</span></span>`
}

function buildGroups(seedGroups, allItems, extraGroupName = "其他"){
  const groups = {}
  const used = new Set()

  Object.entries(seedGroups).forEach(([group, items])=>{
    const validItems = items.filter(name => allItems.includes(name) && !used.has(name))
    groups[group] = validItems
    validItems.forEach(name => used.add(name))
  })

  const remaining = allItems.filter(name => !used.has(name))
  groups[extraGroupName] = remaining
  return groups
}

function getSelectionHighlightColor(){
  const isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  return isDark ? "rgba(47,168,79,0.22)" : "#edf9f0"
}

function isDarkMode(){
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
}

function formatKcal(value){
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}

function formatProtein(value){
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}

function getPer100KcalText(protein, cal){
  if(!cal) return ""
  const per100 = (protein / cal) * 100
  return `${formatProtein(per100)} g / 100 kcal`
}

function formatKcalProteinText(cal, protein){
  if(protein == null || Number.isNaN(protein)) return `${formatKcal(cal)} kcal`
  return `${formatKcal(cal)} kcal · ${formatProtein(protein)} g`
}

/** Modal list meta: kcal · protein on one line; g / 100 kcal efficiency on second when present. */
function formatModalNutritionMetaHtml(cal, protein){
  if(protein == null || Number.isNaN(protein)) return `${formatKcal(cal)} kcal`
  let html = `${formatKcal(cal)} kcal · <span class="item-protein">${formatProtein(protein)} g</span>`
  const efficiency = getPer100KcalText(protein, cal)
  if(efficiency) html += `<br><span class="item-efficiency">${efficiency}</span>`
  return html
}

function formatNutritionSummaryHtml(cal, protein){
  const line1 = formatKcalProteinText(cal, protein)
  const efficiency = getPer100KcalText(protein, cal)
  if(efficiency) return `${line1}<br><span class="result-summary-efficiency">${efficiency}</span>`
  return line1
}

function formatBreakdownNutritionLine(label, item){
  const parts = [`${formatKcal(item.cal)} kcal`]
  if(item.protein != null && !Number.isNaN(item.protein)){
    parts.push(`${formatProtein(item.protein)} g`)
  }
  return `${label}: ${parts.join(" · ")}`
}

function setBilingualModalTitle(el, zh, en){
  if(!el) return
  if(!en){
    el.classList.remove("modal-title-break")
    el.textContent = zh || ""
    return
  }
  if(shouldBreakModalBilingualLine(zh, en)){
    el.classList.add("modal-title-break")
    el.innerHTML = `<span class="modal-zh-inline">${escapeHtml(zh)}</span><span class="modal-en-break">${escapeHtml(en)}</span>`
    return
  }
  el.classList.remove("modal-title-break")
  el.innerHTML = `<span class="modal-zh-inline">${escapeHtml(zh)}</span> <span class="modal-en-inline">${escapeHtml(en)}</span>`
}

function createModalMetaWrap(metaContent, options = {}){
  const { showCheck = false, html = false, hasEfficiency = false } = options
  const wrap = document.createElement("div")
  wrap.className = "modal-item-meta-wrap"
  if(hasEfficiency) wrap.classList.add("modal-item-meta-wrap--efficiency")

  const meta = document.createElement("div")
  meta.className = "modal-item-kcal"
  if(hasEfficiency) meta.classList.add("modal-item-kcal--efficiency")
  if(html){
    meta.innerHTML = metaContent
  } else {
    meta.textContent = metaContent
  }

  const check = document.createElement("span")
  check.className = "modal-checkmark"
  check.textContent = "✓"
  if(!showCheck){
    check.style.visibility = "hidden"
  }

  wrap.appendChild(meta)
  wrap.appendChild(check)
  return wrap
}

function getRecentItems(type, validItems = null){
  const key = RECENT_KEYS[type]
  if(!key) return []
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]")
    if(!Array.isArray(parsed)) return []
    const unique = []
    parsed.forEach(item=>{
      if(typeof item !== "string" || !item) return
      if(unique.includes(item)) return
      unique.push(item)
    })
    if(validItems){
      const validSet = validItems instanceof Set ? validItems : new Set(validItems)
      return unique.filter(item => validSet.has(item)).slice(0, RECENT_LIMIT)
    }
    return unique.slice(0, RECENT_LIMIT)
  } catch (_) {
    return []
  }
}

function saveRecentItem(type, item){
  if(!item) return
  const key = RECENT_KEYS[type]
  const countKey = RECENT_COUNT_KEYS[type]
  if(!key) return
  let counts = {}
  if(countKey){
    try {
      const parsed = JSON.parse(localStorage.getItem(countKey) || "{}")
      if(parsed && typeof parsed === "object" && !Array.isArray(parsed)){
        counts = parsed
      }
    } catch (_) {
      counts = {}
    }
    counts[item] = Number(counts[item] || 0) + 1
    try {
      localStorage.setItem(countKey, JSON.stringify(counts))
    } catch (_) {
      // no-op
    }
    if(counts[item] < 2){
      return
    }
  }
  const next = [item, ...getRecentItems(type).filter(v => v !== item)].slice(0, RECENT_LIMIT)
  try {
    localStorage.setItem(key, JSON.stringify(next))
  } catch (_) {
    // no-op
  }
}

function renderRecentShortcutSection(container, items, getLabel, onPick){
  if(!items || !items.length) return

  const wrapper = document.createElement("div")
  wrapper.className = "modal-recent-shortcuts"

  const hint = document.createElement("div")
  hint.className = "modal-recent-hint"
  hint.textContent = "最近使用 / Last used"
  wrapper.appendChild(hint)

  const row = document.createElement("div")
  row.className = "modal-recent-row"

  items.forEach(item => {
    const btn = document.createElement("button")
    btn.type = "button"
    btn.className = "modal-recent-btn"
    btn.textContent = getLabel(item)
    btn.onclick = (e)=>{
      e.stopPropagation()
      onPick(item)
    }
    row.appendChild(btn)
  })

  wrapper.appendChild(row)
  container.appendChild(wrapper)
}

function compactZhShareName(name){
  return String(name || "").replace(/[（(]([^()（）]+)[)）]/g, "$1")
}

// ---- 歷史紀錄 / Combo history ----------------------------------------------

function getCurrentCombo(){
  const main = document.getElementById("main").value
  if(!main || !data.main[main]) return null
  const double = document.getElementById("double").checked
  const addons = []
  document.querySelectorAll('#addonList input[data-role="addon-value"]').forEach(inp=>{
    if(inp.value && data.addon[inp.value]) addons.push(inp.value)
  })
  const sauce1 = document.getElementById("sauce1").value || ""
  const sauce2Input = document.querySelector('#sauce2List input[data-role="sauce-value"]')
  const sauce2 = sauce2Input ? (sauce2Input.value || "") : ""
  return {
    main,
    double: !!double,
    addons,
    sauce1: data.sauce[sauce1] ? sauce1 : "",
    sauce2: data.sauce[sauce2] ? sauce2 : "",
    ts: Date.now()
  }
}

function comboSignature(c){
  return [
    c.main,
    c.double ? 1 : 0,
    [...(c.addons || [])].sort().join(","),
    [c.sauce1, c.sauce2].filter(Boolean).sort().join(",")
  ].join("|")
}

// Whether combo `a` is contained in combo `b` (same main/double, and b has all
// of a's add-ons and sauces). Used to collapse the build-up of a single combo
// so the history shows the finished sandwich, not every intermediate step.
function comboIsSubsetOf(a, b){
  if(a.main !== b.main || !!a.double !== !!b.double) return false
  const bAddons = new Set(b.addons || [])
  if(!(a.addons || []).every(x => bAddons.has(x))) return false
  const bSauces = new Set([b.sauce1, b.sauce2].filter(Boolean))
  return [a.sauce1, a.sauce2].filter(Boolean).every(x => bSauces.has(x))
}

function comboIsValid(c){
  return c && typeof c === "object" && c.main && data.main[c.main]
}

function getHistory(){
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]")
    if(!Array.isArray(parsed)) return []
    return parsed
      .filter(comboIsValid)
      .map(c => ({
        main: c.main,
        double: !!c.double,
        addons: Array.isArray(c.addons) ? c.addons.filter(n => data.addon[n]) : [],
        sauce1: data.sauce[c.sauce1] ? c.sauce1 : "",
        sauce2: data.sauce[c.sauce2] ? c.sauce2 : "",
        ts: Number(c.ts) || 0
      }))
      .slice(0, HISTORY_LIMIT)
  } catch (_) {
    return []
  }
}

function setHistory(list){
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, HISTORY_LIMIT)))
  } catch (_) {
    // no-op
  }
}

function saveCurrentComboToHistory(){
  const combo = getCurrentCombo()
  if(!combo) return false
  const sig = comboSignature(combo)
  // Drop the exact same combo and any earlier entry this one is a superset of.
  const next = [combo, ...getHistory().filter(h =>
    comboSignature(h) !== sig && !comboIsSubsetOf(h, combo)
  )]
  setHistory(next)
  updateHistoryButton()
  return true
}

function isCurrentComboSaved(){
  const combo = getCurrentCombo()
  if(!combo) return false
  const sig = comboSignature(combo)
  return getHistory().some(h => comboSignature(h) === sig)
}

function updateSaveButtonState(){
  const btn = document.getElementById("saveComboBtn")
  if(!btn) return
  const hasCombo = !!getCurrentCombo()
  btn.disabled = !hasCombo
  const saved = hasCombo && isCurrentComboSaved()
  btn.classList.toggle("saved", saved)
  const textEl = btn.querySelector(".hero-btn-text")
  if(textEl) textEl.textContent = saved ? "已收藏" : "收藏"
  const label = saved ? "已收藏" : "收藏"
  btn.setAttribute("aria-label", label)
  btn.setAttribute("title", label)
}

function saveCurrentComboFromResult(){
  if(isCurrentComboSaved()){
    openHistory()
    return
  }
  if(saveCurrentComboToHistory()){
    haptic()
    updateSaveButtonState()
    showCopyToast("已加入紀錄 Saved")
  }
}

function computeComboNutrition(combo){
  let cal = 0, protein = 0
  if(combo.main && data.main[combo.main]){
    cal += data.main[combo.main].cal
    protein += data.main[combo.main].protein
  }
  if(combo.double && combo.main){
    const key = doubleMeatMap[combo.main] || combo.main
    if(data.addon[key]){
      cal += data.addon[key].cal
      protein += data.addon[key].protein
    }
  }
  (combo.addons || []).forEach(name=>{
    if(data.addon[name]){
      cal += data.addon[name].cal
      protein += data.addon[name].protein
    }
  })
  const s1 = combo.sauce1, s2 = combo.sauce2
  if(s1 && data.sauce[s1] && s2 && data.sauce[s2]){
    cal += data.sauce[s1].cal / 2 + data.sauce[s2].cal / 2
  } else if(s1 && data.sauce[s1]){
    cal += data.sauce[s1].cal
  }
  return { cal, protein }
}

function comboZhTitle(combo){
  return `6吋${combo.main}${combo.double ? " 雙份肉" : ""}`
}

function comboEnTitle(combo){
  const en = mainNameMap[combo.main] || combo.main
  return `6" ${en}${combo.double ? " double meat" : ""}`
}

function comboExtrasText(combo){
  const parts = []
  const addons = (combo.addons || []).map(compactZhShareName)
  if(addons.length) parts.push(addons.join(" + "))
  const sauces = [combo.sauce1, combo.sauce2].filter(Boolean)
  parts.push(sauces.length ? sauces.join(" + ") : "不加醬")
  return parts.join("｜")
}

function applyCombo(combo){
  if(!comboIsValid(combo)) return

  const mainSelect = document.getElementById("main")
  mainSelect.value = combo.main
  updateMainPickerLabel()

  document.getElementById("double").checked = !!combo.double

  const addonList = document.getElementById("addonList")
  addonList.innerHTML = ""
  ;(combo.addons || []).forEach(name=>{
    if(!data.addon[name] || isAddonDuplicate(name)) return
    const wrapper = createAddonSelect(true)
    setAddonValue(wrapper, name)
    addonList.appendChild(wrapper)
  })
  updateAddonUI()

  const sauce1 = document.getElementById("sauce1")
  sauce1.value = data.sauce[combo.sauce1] ? combo.sauce1 : ""
  updateSaucePickerLabel("sauce1")

  const sauce2List = document.getElementById("sauce2List")
  sauce2List.innerHTML = ""
  if(sauce1.value && combo.sauce2 && data.sauce[combo.sauce2]){
    const row = createSauceSelect()
    sauce2List.appendChild(row)
    const hidden = row.querySelector('input[data-role="sauce-value"]')
    if(hidden) hidden.value = combo.sauce2
    updateSaucePickerLabel("sauce2")
  }
  updateSauce2Visibility()

  refreshSwipeValueFlags()
  updateSectionClearButtons()
  calc()
}

function updateHistoryButton(){
  const btn = document.getElementById("historyBtn")
  if(!btn) return
  btn.style.display = getHistory().length ? "" : "none"
}

function openHistory(){
  const modal = document.getElementById("historyModal")
  if(!modal) return
  renderHistoryItems()
  openModal("historyModal")
  modal.onclick = (e)=>{
    if(e.target.id === "historyModal") closeModal("historyModal")
  }
}

function clearHistory(){
  setHistory([])
  updateHistoryButton()
  renderHistoryItems()
  closeModal("historyModal")
}

function renderHistoryItems(){
  const itemsEl = document.getElementById("historyItems")
  const clearBtn = document.getElementById("historyClearBtn")
  if(!itemsEl) return
  itemsEl.innerHTML = ""

  const history = getHistory()
  if(clearBtn) clearBtn.style.display = history.length ? "" : "none"

  if(!history.length){
    const empty = document.createElement("div")
    empty.style.padding = "14px 12px"
    empty.style.fontSize = "13px"
    empty.style.color = "#8e8e93"
    empty.textContent = "尚無紀錄 No history yet"
    itemsEl.appendChild(empty)
    return
  }

  const currentSig = (()=>{ const c = getCurrentCombo(); return c ? comboSignature(c) : "" })()

  history.forEach(combo=>{
    const div = document.createElement("div")
    div.style.padding = "12px"
    div.style.borderBottom = "1px solid #eee"
    div.style.cursor = "pointer"
    div.style.display = "flex"
    div.style.justifyContent = "space-between"
    div.style.alignItems = "center"

    const textWrap = document.createElement("div")
    textWrap.className = "modal-item-title"
    textWrap.style.paddingRight = "10px"
    setBilingualModalTitle(textWrap, comboZhTitle(combo), comboEnTitle(combo))

    const extras = document.createElement("div")
    extras.className = "history-item-extras"
    extras.textContent = comboExtrasText(combo)
    textWrap.appendChild(extras)

    const { cal, protein } = computeComboNutrition(combo)
    const rightWrap = createModalMetaWrap(
      formatModalNutritionMetaHtml(cal, protein),
      { showCheck: comboSignature(combo) === currentSig, html: true, hasEfficiency: true }
    )

    div.appendChild(textWrap)
    div.appendChild(rightWrap)

    div.onclick = ()=>{
      applyCombo(combo)
      closeModal("historyModal")
    }

    itemsEl.appendChild(div)
  })
}

function hasSeenSwipeHint(type){
  const key = SWIPE_HINT_KEYS[type]
  if(!key) return false
  return localStorage.getItem(key) === "1"
}

function markSwipeHintSeen(type){
  const key = SWIPE_HINT_KEYS[type]
  if(!key) return
  try {
    localStorage.setItem(key, "1")
  } catch (_) {
    // no-op
  }
}

function isDesktopHoverMode(){
  return window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches
}

function refreshSwipeValueFlags(){
  document.querySelectorAll(".swipe-row").forEach(row=>{
    let hasValue = false

    if(row.id === "mainPickerRow"){
      hasValue = !!document.getElementById("main")?.value
    } else if(row.id === "sauce1Row"){
      hasValue = !!document.getElementById("sauce1")?.value
    } else if(row.classList.contains("addon-row")){
      hasValue = !!row.querySelector('input[data-role="addon-value"]')?.value
    } else if(row.classList.contains("sauce-row")){
      hasValue = !!row.querySelector('input[data-role="sauce-value"]')?.value
    }

    row.classList.toggle("has-swipe-value", hasValue)
  })
}

function updateSwipeHints(){
  const addonHint = document.getElementById("addonSwipeHint")
  const sauceHint = document.getElementById("sauceSwipeHint")

  if(!addonHint && !sauceHint) return
  if(isDesktopHoverMode()){
    if(addonHint) addonHint.style.display = "none"
    if(sauceHint) sauceHint.style.display = "none"
    return
  }

  const hasAddonRows = document.querySelectorAll("#addonList .addon-row").length > 0
  const hasSauceRows = !!document.getElementById("sauce1")?.value || !!document.querySelector('#sauce2List input[data-role="sauce-value"]')?.value

  if(addonHint){
    addonHint.style.display = (hasAddonRows && !hasSeenSwipeHint("addon")) ? "block" : "none"
  }
  if(sauceHint){
    sauceHint.style.display = (hasSauceRows && !hasSeenSwipeHint("sauce")) ? "block" : "none"
  }
}

function isPickerTapSuppressed(){
  return Date.now() < suppressPickerTapUntil
}

document.addEventListener("touchstart", (e)=>{
  if(e.target.closest(".swipe-row")) return
  closeOtherSwipeRows()
}, { passive: true })

function openSauce1Picker(){
  if(isPickerTapSuppressed()) return
  openSaucePicker("sauce1")
}

function flashPickerSelection(el){
  if(!el) return
  haptic()
  el.classList.remove("picker-select-flash")
  void el.offsetWidth
  el.classList.add("picker-select-flash")
  setTimeout(()=> el.classList.remove("picker-select-flash"), 280)
}

function animatePickerAppear(el){
  if(!el) return
  el.classList.remove("picker-soft-appear")
  void el.offsetWidth
  el.classList.add("picker-soft-appear")
  setTimeout(()=> el.classList.remove("picker-soft-appear"), 260)
}

function animateRowEnter(el){
  if(!el) return
  el.classList.remove("row-enter")
  void el.offsetWidth
  el.classList.add("row-enter")
  setTimeout(()=> el.classList.remove("row-enter"), 300)
}

function maybePeekHint(row, type){
  // Only on touch devices, only once per type
  if(isDesktopHoverMode()) return
  if(hasSeenSwipeHint(type)) return
  // Trigger peek after row enter animation settles
  setTimeout(() => {
    row.classList.add("peek-hint")
    setTimeout(() => {
      row.classList.remove("peek-hint")
      markSwipeHintSeen(type)
      updateSwipeHints()
    }, 1600)
  }, 320)
}

function styleModalCategoryButton(btn, active){
  const dark = isDarkMode()
  btn.style.padding = "8px 12px"
  btn.style.borderRadius = "999px"
  btn.style.border = dark ? "1px solid #3a3a3c" : "1px solid #ddd"
  btn.style.background = active ? "#2fa84f" : (dark ? "#2c2c2e" : "#fff")
  btn.style.color = active ? "#f3fff7" : (dark ? "#f2f2f7" : "#000")
}

function closeSwipeRow(row){
  if(!row) return
  row.classList.remove("swiped")
  const picker = row.querySelector(".picker-field")
  const actionBtn = row.querySelector('[data-role="swipe-action"]')
  if(picker) picker.style.transform = ""
  if(actionBtn){
    actionBtn.style.opacity = ""
    actionBtn.style.width = ""
    actionBtn.style.removeProperty("--clearLabelOpacity")
    actionBtn.style.transform = ""
  }
  refreshSwipeValueFlags()
}

function removeRowWithAnimation(row, onDone){
  if(!row){
    if(onDone) onDone()
    return
  }

  closeSwipeRow(row)

  // Lock the current height so we can transition the collapse — otherwise the
  // rows below snap up abruptly the instant this one is removed from layout.
  const startH = row.offsetHeight
  row.style.height = startH + "px"
  row.style.minHeight = "0px"
  row.style.overflow = "hidden"
  row.classList.add("removing")
  row.style.transition = "height 0.34s cubic-bezier(.20,.72,.28,1), margin 0.34s cubic-bezier(.20,.72,.28,1)"
  // Force a reflow so the start height is committed before we collapse — the
  // transition then runs without depending on requestAnimationFrame (which is
  // throttled in background tabs).
  void row.offsetWidth
  row.style.height = "0px"
  row.style.marginTop = "0px"
  row.style.marginBottom = "0px"

  setTimeout(()=>{
    row.remove()
    if(onDone) onDone()
  }, 360)
}

function closeOtherSwipeRows(exceptRow = null){
  document.querySelectorAll(".swipe-row.swiped").forEach(row=>{
    if(row !== exceptRow) closeSwipeRow(row)
  })
}

function attachSwipeToReveal(row, onSwipeAction, canSwipe){
  if(!row || row.dataset.swipeReady === "1") return
  row.dataset.swipeReady = "1"

  const picker = row.querySelector(".picker-field")
  const actionBtn = row.querySelector('[data-role="swipe-action"]')
  if(!picker || !actionBtn) return
  const hintType = row.dataset.swipeHintType || ""

  let startX = 0
  let startY = 0
  let currentX = 0
  let lastTranslate = 0
  let lastVelocityX = 0
  let lastSampleX = 0
  let lastSampleTime = 0
  let isSwiping = false
  let pointerDown = false
  let activeTouchId = null
  let revealWidth = 92
  let maxDrag = 132
  let deleteThreshold = 124
  let minClearWidth = 56
  let settleClearWidth = 84
  let maxClearWidth = 84
  let settleThreshold = 54
  let rowWidth = 0

  const FLING_DELETE_V = -0.45
  const FLING_OPEN_V = -0.28
  const FLING_CLOSE_V = 0.22

  const applySwipeResistance = (translateX)=>{
    if(translateX > 0){
      return translateX * 0.32
    }
    const minX = -(rowWidth + 20)
    if(translateX < minX){
      return minX - (minX - translateX) * 0.24
    }
    return translateX
  }

  const setSwipeVisual = (translateX)=>{
    const next = applySwipeResistance(translateX)
    lastTranslate = next
    picker.style.transform = `translateX(${next}px)`
    const drag = Math.abs(next)
    const commitPoint = rowWidth * 0.50

    // Phase 1: 0 → revealWidth: proportional grow
    // Phase 2: revealWidth → commitPoint: continue growing toward full row
    // Phase 3: commitPoint+: snap to full row width (commit state)
    let clearWidth
    const isCommit = drag >= commitPoint
    if(drag <= revealWidth){
      clearWidth = (drag / revealWidth) * settleClearWidth
    } else if(!isCommit){
      const ratio = (drag - revealWidth) / Math.max(1, commitPoint - revealWidth)
      clearWidth = settleClearWidth + ratio * (rowWidth - settleClearWidth)
    } else {
      clearWidth = rowWidth
    }
    clearWidth = Math.max(0, clearWidth)

    const bgOpacity = drag < 14 ? 0 : Math.min(1, (drag - 14) / 22)
    const labelOpacity = drag < 36 ? 0 : Math.min(1, (drag - 36) / 20)

    actionBtn.style.opacity = String(bgOpacity)
    actionBtn.style.width = `${clearWidth}px`
    actionBtn.style.setProperty("--clearLabelOpacity", labelOpacity.toFixed(3))
    actionBtn.style.transform = "translateX(0)"
    actionBtn.classList.toggle("swipe-commit", isCommit)
  }

  const onStart = (clientX, clientY)=>{
    if(typeof canSwipe === "function" && !canSwipe()){
      closeSwipeRow(row)
      return false
    }
    const rect = picker.getBoundingClientRect()
    const rowHeight = Math.max(48, Math.round(rect.height))
    rowWidth = Math.max(220, Math.round(rect.width))
    minClearWidth = Math.max(52, Math.round(rowHeight * 1.03))
    settleClearWidth = Math.max(minClearWidth + 12, Math.round(rowHeight * 1.48))
    maxClearWidth = Math.max(settleClearWidth + 24, Math.min(Math.round(rowWidth * 0.76), Math.round(rowHeight * 4.1)))
    revealWidth = Math.max(settleClearWidth + 10, Math.round(rowHeight * 1.74))
    maxDrag = rowWidth + 20
    deleteThreshold = Math.round(rowWidth * 0.50)   // trigger at 50%
    settleThreshold = Math.max(42, Math.round(revealWidth * 0.56))
    actionBtn.style.height = `${Math.max(40, rowHeight - 8)}px`

    startX = clientX
    startY = clientY
    currentX = startX
    lastSampleX = clientX
    lastSampleTime = Date.now()
    lastVelocityX = 0
    lastTranslate = row.classList.contains("swiped") ? -revealWidth : 0
    isSwiping = false
    pointerDown = true
    closeOtherSwipeRows(row)
    return true
  }

  const onMove = (clientX, clientY)=>{
    if(!pointerDown) return false
    if(typeof canSwipe === "function" && !canSwipe()){
      closeSwipeRow(row)
      return false
    }
    currentX = clientX
    const currentY = clientY
    const diffX = currentX - startX
    const diffY = currentY - startY

    if(!isSwiping){
      if(Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)){
        isSwiping = true
        row.classList.add("swipe-dragging")
        document.body.classList.add("swipe-dragging")
      } else {
        return false
      }
    }

    const baseOffset = row.classList.contains("swiped") ? -revealWidth : 0
    const next = baseOffset + diffX
    setSwipeVisual(next)

    const now = Date.now()
    const dt = Math.max(1, now - lastSampleTime)
    lastVelocityX = (clientX - lastSampleX) / dt
    lastSampleX = clientX
    lastSampleTime = now
    return true
  }

  const detachDocumentTouch = ()=>{
    document.removeEventListener("touchmove", onDocumentTouchMove)
    document.removeEventListener("touchend", onDocumentTouchEnd)
    document.removeEventListener("touchcancel", onDocumentTouchCancel)
    activeTouchId = null
  }

  const onDocumentTouchMove = (e)=>{
    if(activeTouchId === null) return
    const touch = Array.from(e.touches).find(t => t.identifier === activeTouchId)
    if(!touch) return
    const moved = onMove(touch.clientX, touch.clientY)
    if(moved) e.preventDefault()
  }

  const onDocumentTouchEnd = (e)=>{
    if(activeTouchId === null) return
    const ended = Array.from(e.changedTouches).find(t => t.identifier === activeTouchId)
    if(!ended) return
    detachDocumentTouch()
    onEnd(lastVelocityX)
  }

  const onDocumentTouchCancel = ()=>{
    if(activeTouchId === null) return
    detachDocumentTouch()
    pointerDown = false
    row.classList.remove("swipe-dragging")
    document.body.classList.remove("swipe-dragging")
    closeSwipeRow(row)
  }

  const onEnd = (velocityX = 0)=>{
    if(!pointerDown) return
    pointerDown = false
    row.classList.remove("swipe-dragging")
    document.body.classList.remove("swipe-dragging")

    if(!isSwiping){
      return
    }

    suppressPickerTapUntil = Date.now() + 280

    const dragDistance = Math.abs(lastTranslate)
    const wasOpen = row.classList.contains("swiped")
    const deleteByDistance = dragDistance >= deleteThreshold
    const deleteByFling = velocityX <= FLING_DELETE_V && dragDistance >= 24
    const commitDelete = deleteByDistance || deleteByFling

    if(commitDelete){
      if(hintType){
        markSwipeHintSeen(hintType)
        updateSwipeHints()
      }
      if(typeof onSwipeAction === "function"){
        onSwipeAction()
      }
      setTimeout(()=> closeSwipeRow(row), 0)
      return
    }

    const openByDistance = dragDistance >= settleThreshold
    const openByFling = velocityX <= FLING_OPEN_V && dragDistance >= 18
    const shouldSnapOpen = openByDistance || openByFling

    const closeByDistance = dragDistance < settleThreshold * 0.72
    const closeByFling = velocityX >= FLING_CLOSE_V && dragDistance < settleThreshold

    if(wasOpen && (closeByFling || closeByDistance)){
      closeSwipeRow(row)
      return
    }

    if(shouldSnapOpen){
      if(hintType){
        markSwipeHintSeen(hintType)
        updateSwipeHints()
      }
      row.classList.add("swiped")
      setSwipeVisual(-revealWidth)
    } else {
      closeSwipeRow(row)
    }
  }

  row.addEventListener("touchstart", (e)=>{
    const touch = e.touches[0]
    if(!touch) return
    const started = onStart(touch.clientX, touch.clientY)
    if(!started) return

    activeTouchId = touch.identifier
    lastVelocityX = 0
    lastSampleX = touch.clientX
    lastSampleTime = Date.now()

    document.addEventListener("touchmove", onDocumentTouchMove, { passive: false })
    document.addEventListener("touchend", onDocumentTouchEnd)
    document.addEventListener("touchcancel", onDocumentTouchCancel)
  }, { passive: true })

  row.addEventListener("mousedown", (e)=>{
    if(e.button !== 0) return
    if(e.target.closest('[data-role="swipe-action"]')) return
    const ok = onStart(e.clientX, e.clientY)
    if(ok) e.preventDefault()
  })

  window.addEventListener("mousemove", (e)=>{
    const moved = onMove(e.clientX, e.clientY)
    if(moved) e.preventDefault()
  })

  window.addEventListener("mouseup", ()=>{
    onEnd()
  })

  actionBtn.addEventListener("click", (e)=>{
    e.stopPropagation()
    if(typeof onSwipeAction === "function"){
      onSwipeAction()
    }
    closeSwipeRow(row)
  })
}

const mainSeedGroups = {
  "牛肉系": ["厚切嫩牛","燒烤牛肉","墨西哥辣牛","義大利牛肉丸"],
  "雞肉系": ["照燒雞肉","鮮嫩雞柳","香烤雞肉","嫩切雞肉"],
  "豬肉冷切系": ["火腿","百味俱樂部","義大利經典","哈燒起司總匯","墨西哥手撕豬"],
  "海鮮蛋素食": ["鮪魚","蛋沙拉","鷹嘴豆泥餅","素食蔬菜"]
}

const addonGroupDisplayLabels = {
  "起司蛋配料": "起司蛋"
}

const addonSeedGroups = {
  "起司蛋配料": ["切絲巧達起司","英式切片起司(2片)","嫩煎蛋(1片)","酪梨泥(1球)","蛋沙拉(1球)","蛋沙拉(2球)"],
  "雞肉": ["鮮嫩雞柳","嫩切雞肉(3片)","嫩切雞肉(1片)","香烤雞肉","照燒雞肉"],
  "牛肉": ["厚切嫩牛","燒烤牛肉(3片/59g)","燒烤牛肉(1片/19.5g)","墨西哥辣牛","辣豆瓣嫩牛","義大利牛肉丸"],
  "豬肉冷切": ["火腿(4片)","火腿(1片)","墨西哥手撕豬","義大利經典","百味俱樂部","哈燒起司總匯","義式辣香腸(1片)","義式煙燻臘腸(1片)","培根(1條)"],
  "海鮮素食": ["鮪魚","鷹嘴豆泥餅(1顆)","鷹嘴豆泥餅(3顆)"]
}

let mainGroups = {}
let mainActiveGroup = ""

function updateMainPickerLabel(){
  const value = document.getElementById("main").value
  const picker = document.getElementById("mainPicker")
  if(!picker) return

  if(!value){
    picker.textContent = "選擇主餐"
    picker.classList.remove("picker-field--bilingual-break")
    picker.classList.add("picker-field--placeholder")
    picker.classList.add("picker-field--plus")
    picker.classList.remove("picker-field-with-minus")
    updateSectionClearButtons()
    return
  }

  const en = mainNameMap[value] || ""
  setBilingualPickerText(picker, value, en)
  picker.classList.remove("picker-field--placeholder")
  picker.classList.remove("picker-field--plus")
  picker.classList.remove("picker-field-with-minus")
  updateSectionClearButtons()
}

function clearMainSection(){
  const mainSelect = document.getElementById("main")
  if(!mainSelect) return
  mainSelect.value = ""
  document.getElementById("double").checked = false
  updateMainPickerLabel()
  refreshSwipeValueFlags()
  animatePickerAppear(document.getElementById("mainPicker"))
  calc()
}

function ensureMainSwipeAction(){
  const row = document.getElementById("mainPickerRow")
  if(!row || row.dataset.clearReady === "1") return
  row.dataset.clearReady = "1"
  row.classList.add("swipe-row")
  row.dataset.swipeHintType = "main"

  const actionBtn = document.createElement("button")
  actionBtn.type = "button"
  actionBtn.dataset.role = "swipe-action"
  actionBtn.className = "swipe-clear-btn"
  actionBtn.textContent = "Delete"
  actionBtn.setAttribute("aria-label", "Delete main selection")
  row.appendChild(actionBtn)

  attachSwipeToReveal(row, ()=>{
    clearMainSection()
  }, ()=> !!document.getElementById("main")?.value)
}

function maybePeekMainSwipeHint(){
  const row = document.getElementById("mainPickerRow")
  if(row && document.getElementById("main")?.value){
    maybePeekHint(row, "main")
  }
}

function openMainPicker(defaultGroup = ""){
  if(isPickerTapSuppressed()) return
  const modal = document.getElementById("mainModal")
  const catEl = document.getElementById("mainModalCategories")
  const itemsEl = document.getElementById("mainItems")
  const searchEl = document.getElementById("mainSearch")

  if(!modal || !catEl || !itemsEl) return

  openModal("mainModal", searchEl)
  catEl.innerHTML = ""
  itemsEl.innerHTML = ""
  if(searchEl) searchEl.value = ""

  const groupNames = Object.keys(mainGroups).filter(g => (mainGroups[g] || []).length > 0)
  if(!groupNames.length) return

  const selectedGroup = defaultGroup && groupNames.includes(defaultGroup)
    ? defaultGroup
    : (groupNames.includes(mainActiveGroup) ? mainActiveGroup : groupNames[0])
  mainActiveGroup = selectedGroup

  groupNames.forEach((g)=>{
    const btn = document.createElement("button")
    btn.type = "button"
    btn.textContent = g
    styleModalCategoryButton(btn, g===selectedGroup)

    btn.onclick = ()=>{
      mainActiveGroup = g
      document.querySelectorAll("#mainModalCategories button").forEach(b=>styleModalCategoryButton(b,false))
      styleModalCategoryButton(btn,true)
      renderMainItems(g)
    }

    catEl.appendChild(btn)
  })

  renderMainItems(selectedGroup)

  modal.onclick = (e)=>{
    if(e.target.id==="mainModal") closeModal("mainModal")
  }
}

function renderMainItems(group){
  const itemsEl = document.getElementById("mainItems")
  const searchEl = document.getElementById("mainSearch")
  itemsEl.innerHTML = ""
  const selectedMain = document.getElementById("main").value
  const query = searchEl ? searchEl.value.trim().toLowerCase() : ""

  const searchPool = query
    ? Object.keys(data.main)
    : (mainGroups[group] || [])

  const sortedNames = [...searchPool]
    .filter(name => !!data.main[name])
    .filter(name => {
      if(!query) return true
      const en = mainNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
    .sort((a,b)=> data.main[b].cal - data.main[a].cal)

  const recentMainNames = getRecentItems("main", Object.keys(data.main))
    .filter(name => {
      if(!query) return true
      const en = mainNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
  const showRecentShortcuts = !query && recentMainNames.length > 0

  const renderMainItem = (name)=>{
    if(!data.main[name]) return;

    const div = document.createElement("div")
    div.style.padding = "12px"
    div.style.borderBottom = "1px solid #eee"
    div.style.cursor = "pointer"
    div.style.display = "flex"
    div.style.justifyContent = "space-between"
    div.style.alignItems = "center"

    const en = mainNameMap[name] || ""
    const textWrap = document.createElement("div")
    textWrap.className = "modal-item-title"
    setBilingualModalTitle(textWrap, name, en)
    textWrap.style.paddingRight = "10px"

    const rightWrap = createModalMetaWrap(
      formatModalNutritionMetaHtml(data.main[name].cal, data.main[name].protein),
      { showCheck: name === selectedMain, html: true, hasEfficiency: true }
    )

    div.appendChild(textWrap)
    div.appendChild(rightWrap)

    const isCurrentSelected = name === selectedMain
    if(isCurrentSelected){
      div.style.opacity = "0.45"
      div.style.cursor = "not-allowed"
    }

    div.onclick = ()=>{
      if(isCurrentSelected) return
      const mainSelect = document.getElementById("main")
      mainSelect.value = name
      saveRecentItem("main", name)
      updateMainPickerLabel()
      flashPickerSelection(document.getElementById("mainPicker"))
      maybePeekMainSwipeHint()
      closeModal("mainModal")
      calc()
    }

    itemsEl.appendChild(div)
  }

  if(!showRecentShortcuts && !sortedNames.length){
    const empty = document.createElement("div")
    empty.style.padding = "14px 12px"
    empty.style.fontSize = "13px"
    empty.style.color = "#8e8e93"
    empty.textContent = query ? "找不到符合的口味 No matching flavor" : "此分類目前沒有項目"
    itemsEl.appendChild(empty)
    return
  }

  if(showRecentShortcuts){
    renderRecentShortcutSection(
      itemsEl,
      recentMainNames,
      (name)=> name,
      (name)=>{
        const mainSelect = document.getElementById("main")
        mainSelect.value = name
        saveRecentItem("main", name)
        updateMainPickerLabel()
        flashPickerSelection(document.getElementById("mainPicker"))
        maybePeekMainSwipeHint()
        closeModal("mainModal")
        calc()
      }
    )
  }

  sortedNames.forEach(renderMainItem)
}

const addonNameMap = {
  "嫩切雞肉(3片)":"Chicken Sliced (3 slices)",
  "嫩切雞肉(1片)":"Chicken Sliced (1 slice)",
  "照燒雞肉":"Chicken Teriyaki",
  "鮮嫩雞柳":"Chicken Strips",
  "香烤雞肉":"Oven Roasted Chicken Breast",
  "厚切嫩牛":"Diced Beef",
  "火腿(4片)":"Ham (4 slices)",
  "火腿(1片)":"Ham (1 slice)",
  "培根(1條)":"Bacon (1 strip)",
  "義大利牛肉丸":"Italian Meatballs",
  "燒烤牛肉(3片/59g)":"Roast Beef (3 slices)",
  "燒烤牛肉(1片/19.5g)":"Roast Beef (1 slice)",
  "墨西哥辣牛":"Taco Beef",
  "義大利經典":"Italian B.M.T.",
  "百味俱樂部":"Subway Club",
  "義式煙燻臘腸(1片)":"Salami",
  "義式辣香腸(1片)":"Pepperoni",
  "哈燒起司總匯":"Subway Melt",
  "鮪魚":"Tuna",
  "蛋沙拉(2球)":"Egg Mayo (2 scoops)",
  "蛋沙拉(1球)":"Egg Mayo (1 scoop)",
  "嫩煎蛋(1片)":"Egg Patty",
  "酪梨泥(1球)":"Avocado",
  "英式切片起司(2片)":"Old English Cheese (2 slices)",
  "英式切片起司(1片)":"Old English Cheese (1 slice)",
  "切絲巧達起司":"Shredded Cheddar Cheese",
  "鷹嘴豆泥餅(3顆)":"Falafel (3 pieces)",
  "鷹嘴豆泥餅(1顆)":"Falafel (1 piece)",
  "辣豆瓣嫩牛":"Mala Beef",
  "墨西哥手撕豬":"Mexican Pulled Pork"
}

const addonGroups = buildGroups(addonSeedGroups, Object.keys(data.addon), "其他")

let addonActiveGroup = Object.keys(addonGroups)[0] || ""
let addonPickerTargetRow = null
let addonPickerTargetHidden = null
let copyToastTimer = null

function getSelectedAddonValues(ignoreSelect = null){
  const values = []
  document.querySelectorAll("#addonList .addon-row").forEach(row => {
    const hidden = row.querySelector('input[data-role="addon-value"]')
    if(hidden === ignoreSelect) return
    if(hidden && hidden.value) values.push(hidden.value)
  })
  return values
}

function isAddonDuplicate(name, ignoreSelect = null){
  if(!name) return false
  return getSelectedAddonValues(ignoreSelect).includes(name)
}

function openAddonPicker(defaultGroup = "", targetRow = null){
  addonPickerTargetRow = targetRow
  addonPickerTargetHidden = targetRow ? targetRow.querySelector('input[data-role="addon-value"]') : null

  const modal = document.getElementById("addonModal")
  const catEl = document.getElementById("addonModalCategories")
  const itemsEl = document.getElementById("addonItems")
  const searchEl = document.getElementById("addonSearch")

  openModal("addonModal", searchEl)
  catEl.innerHTML = ""
  itemsEl.innerHTML = ""
  if(searchEl) searchEl.value = ""

  const groupNames = Object.keys(addonGroups).filter(g => (addonGroups[g] || []).length > 0)
  if(!groupNames.length) return
  const selectedGroup = defaultGroup && groupNames.includes(defaultGroup)
    ? defaultGroup
    : (groupNames.includes(addonActiveGroup) ? addonActiveGroup : groupNames[0])
  addonActiveGroup = selectedGroup

  groupNames.forEach((g)=>{
    const btn = document.createElement("button")
    btn.type = "button"
    btn.textContent = addonGroupDisplayLabels[g] ?? g
    styleModalCategoryButton(btn, g===selectedGroup)

    btn.onclick = ()=>{
      addonActiveGroup = g
      document.querySelectorAll("#addonModalCategories button").forEach(b=>styleModalCategoryButton(b,false))
      styleModalCategoryButton(btn,true)
      renderAddonItems(g)
    }

    catEl.appendChild(btn)
  })

  renderAddonItems(selectedGroup)

  modal.onclick = (e)=>{
    if(e.target.id==="addonModal") closeModal("addonModal")
  }
}

function renderAddonItems(group){
  const itemsEl = document.getElementById("addonItems")
  const searchEl = document.getElementById("addonSearch")
  itemsEl.innerHTML = ""
  const selected = new Set(getSelectedAddonValues())
  const editingCurrentValue = addonPickerTargetHidden ? addonPickerTargetHidden.value : ""
  const query = searchEl ? searchEl.value.trim().toLowerCase() : ""
  const searchPool = query
    ? Object.keys(data.addon)
    : (addonGroups[group] || []).filter(name => !!data.addon[name])

  const recentAddonNames = getRecentItems("addon", Object.keys(data.addon))
    .filter(name => {
      if(!query) return true
      const en = addonNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
  const showRecentShortcuts = !query && recentAddonNames.length > 0

  const sortedAddonNames = [...searchPool]
    .filter(name => {
      if(!query) return true
      const en = addonNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
    .sort((a,b)=> data.addon[b].cal - data.addon[a].cal)

  if(!showRecentShortcuts && !sortedAddonNames.length){
    const empty = document.createElement("div")
    empty.style.padding = "14px 12px"
    empty.style.fontSize = "13px"
    empty.style.color = "#8e8e93"
    empty.textContent = query ? "找不到符合的加料 No matching add-ons" : "此分類目前沒有項目"
    itemsEl.appendChild(empty)
    return
  }

  const renderAddonItem = (name)=>{
    if(!data.addon[name]) return;

    const div = document.createElement("div")
    div.style.padding = "12px"
    div.style.borderBottom = "1px solid #eee"
    div.style.cursor = "pointer"
    div.style.display = "flex"
    div.style.justifyContent = "space-between"
    div.style.alignItems = "center"

    const en = addonNameMap[name] || ""
    const textWrap = document.createElement("div")
    textWrap.className = "modal-item-title"
    setBilingualModalTitle(textWrap, name, en)
    textWrap.style.paddingRight = "10px"

    const rightWrap = createModalMetaWrap(
      formatModalNutritionMetaHtml(data.addon[name].cal, data.addon[name].protein),
      {
        showCheck: selected.has(name) || (!!editingCurrentValue && name === editingCurrentValue),
        html: true,
        hasEfficiency: true
      }
    )

    div.appendChild(textWrap)
    const alreadySelected = selected.has(name)
    const isCurrentEditingValue = !!editingCurrentValue && name === editingCurrentValue
    div.appendChild(rightWrap)
    if(alreadySelected || isCurrentEditingValue){
      div.style.opacity = "0.45"
      div.style.cursor = "not-allowed"
    }

    div.onclick = ()=>{
      if(alreadySelected || isCurrentEditingValue) return
      if(addonPickerTargetRow){
        setAddonValue(addonPickerTargetRow, name)
        saveRecentItem("addon", name)
        flashPickerSelection(addonPickerTargetRow.querySelector(".picker-field"))
        closeModal("addonModal")
        calc()
        return
      }
      const added = addAddon(name)
      if(!added) return
      saveRecentItem("addon", name)
      closeModal("addonModal")
    }
    itemsEl.appendChild(div)
  }

  if(showRecentShortcuts){
    renderRecentShortcutSection(
      itemsEl,
      recentAddonNames,
      (name)=> name,
      (name)=>{
        if(addonPickerTargetRow){
          setAddonValue(addonPickerTargetRow, name)
          saveRecentItem("addon", name)
          flashPickerSelection(addonPickerTargetRow.querySelector(".picker-field"))
          closeModal("addonModal")
          calc()
          return
        }
        const added = addAddon(name)
        if(!added) return
        saveRecentItem("addon", name)
        closeModal("addonModal")
      }
    )
  }

  sortedAddonNames.forEach(renderAddonItem)
}

function openQuickSearch(){
  const modal = document.getElementById("quickSearchModal")
  const input = document.getElementById("quickSearchInput")
  if(!modal || !input) return
  openModal("quickSearchModal", input)
  input.value = ""
  renderQuickSearchItems()
  modal.onclick = (e)=>{
    if(e.target.id === "quickSearchModal") closeQuickSearch()
  }
}

function closeQuickSearch(){
  closeModal("quickSearchModal")
}

function renderQuickSearchItems(){
  const input = document.getElementById("quickSearchInput")
  const itemsEl = document.getElementById("quickSearchItems")
  if(!input || !itemsEl) return

  const query = input.value.trim().toLowerCase()
  itemsEl.innerHTML = ""

  if(!query){
    const hint = document.createElement("div")
    hint.style.padding = "14px 12px"
    hint.style.fontSize = "13px"
    hint.style.color = "#8e8e93"
    hint.textContent = "輸入關鍵字以搜尋口味、加料、醬料"
    itemsEl.appendChild(hint)
    return
  }

  const selectedMain = document.getElementById("main").value
  const selectedAddon = new Set(getSelectedAddonValues())
  const sauce1Value = document.getElementById("sauce1").value
  const sauce2ValueInput = document.querySelector('#sauce2List input[data-role="sauce-value"]')
  const sauce2Value = sauce2ValueInput ? sauce2ValueInput.value : ""
  const selectedSauce = new Set([sauce1Value, sauce2Value].filter(Boolean))

  const mainMatches = Object.keys(data.main)
    .filter(name => {
      const en = mainNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
    .sort((a,b)=> data.main[b].cal - data.main[a].cal)

  const addonMatches = Object.keys(data.addon)
    .filter(name => {
      const en = addonNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
    .sort((a,b)=> data.addon[b].cal - data.addon[a].cal)

  const sauceMatches = Object.keys(data.sauce)
    .filter(name => {
      const en = sauceNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
    .sort((a,b)=> data.sauce[b].cal - data.sauce[a].cal)

  if(!mainMatches.length && !addonMatches.length && !sauceMatches.length){
    const empty = document.createElement("div")
    empty.style.padding = "14px 12px"
    empty.style.fontSize = "13px"
    empty.style.color = "#8e8e93"
    empty.textContent = "找不到符合項目 No matching items"
    itemsEl.appendChild(empty)
    return
  }

  const renderSectionTitle = (text)=>{
    const title = document.createElement("div")
    title.style.padding = "10px 12px 6px"
    title.style.fontSize = "11px"
    title.style.fontWeight = "700"
    title.style.letterSpacing = "0.25px"
    title.style.color = "var(--kcal-muted)"
    title.textContent = text
    itemsEl.appendChild(title)
  }

  const renderMainItem = (name)=>{
    const row = document.createElement("div")
    row.style.padding = "12px"
    row.style.borderBottom = "1px solid #eee"
    row.style.cursor = "pointer"
    row.style.display = "flex"
    row.style.justifyContent = "space-between"
    row.style.alignItems = "center"

    const en = mainNameMap[name] || ""
    const left = document.createElement("div")
    left.className = "modal-item-title"
    setBilingualModalTitle(left, name, en)
    left.style.paddingRight = "10px"

    const rightWrap = createModalMetaWrap(
      formatModalNutritionMetaHtml(data.main[name].cal, data.main[name].protein),
      { showCheck: name === selectedMain, html: true, hasEfficiency: true }
    )

    if(name === selectedMain){
      row.style.opacity = "0.45"
      row.style.cursor = "not-allowed"
      row.appendChild(left)
      row.appendChild(rightWrap)
    } else {
      row.appendChild(left)
      row.appendChild(rightWrap)
      row.onclick = ()=>{
        const mainSelect = document.getElementById("main")
        mainSelect.value = name
        saveRecentItem("main", name)
        updateMainPickerLabel()
        flashPickerSelection(document.getElementById("mainPicker"))
        closeQuickSearch()
        calc()
      }
    }

    itemsEl.appendChild(row)
  }

  const renderAddonItem = (name)=>{
    const row = document.createElement("div")
    row.style.padding = "12px"
    row.style.borderBottom = "1px solid #eee"
    row.style.cursor = "pointer"
    row.style.display = "flex"
    row.style.justifyContent = "space-between"
    row.style.alignItems = "center"

    const en = addonNameMap[name] || ""
    const left = document.createElement("div")
    left.className = "modal-item-title"
    setBilingualModalTitle(left, name, en)
    left.style.paddingRight = "10px"

    const rightWrap = createModalMetaWrap(
      formatModalNutritionMetaHtml(data.addon[name].cal, data.addon[name].protein),
      {
        showCheck: selectedAddon.has(name),
        html: true,
        hasEfficiency: true
      }
    )

    if(selectedAddon.has(name)){
      row.style.opacity = "0.45"
      row.style.cursor = "not-allowed"
      row.appendChild(left)
      row.appendChild(rightWrap)
    } else {
      row.appendChild(left)
      row.appendChild(rightWrap)
      row.onclick = ()=>{
        const added = addAddon(name)
        if(!added) return
        saveRecentItem("addon", name)
        closeQuickSearch()
      }
    }

    itemsEl.appendChild(row)
  }

  const renderSauceItem = (name)=>{
    const row = document.createElement("div")
    row.style.padding = "12px"
    row.style.borderBottom = "1px solid #eee"
    row.style.cursor = "pointer"
    row.style.display = "flex"
    row.style.justifyContent = "space-between"
    row.style.alignItems = "center"

    const en = sauceNameMap[name] || ""
    const left = document.createElement("div")
    left.className = "modal-item-title"
    setBilingualModalTitle(left, name, en)
    left.style.paddingRight = "10px"

    const rightWrap = createModalMetaWrap(`${data.sauce[name].cal} kcal`, {
      showCheck: selectedSauce.has(name)
    })

    if(selectedSauce.has(name)){
      row.style.opacity = "0.45"
      row.style.cursor = "not-allowed"
      row.appendChild(left)
      row.appendChild(rightWrap)
    } else {
      row.appendChild(left)
      row.appendChild(rightWrap)
      row.onclick = ()=>{
        const sauce1El = document.getElementById("sauce1")
        const currentSauce1 = sauce1El ? sauce1El.value : ""
        const currentSauce2Input = document.querySelector('#sauce2List input[data-role="sauce-value"]')
        const currentSauce2 = currentSauce2Input ? currentSauce2Input.value : ""

        if(!currentSauce1){
          sauce1El.value = name
          updateSaucePickerLabel("sauce1")
          flashPickerSelection(document.getElementById("sauce1Picker"))
        } else if(!currentSauce2){
          const list = document.getElementById("sauce2List")
          let sauce2Row = list ? list.querySelector(".sauce-row") : null
          if(!sauce2Row && list){
            sauce2Row = createSauceSelect()
            list.appendChild(sauce2Row)
            animateRowEnter(sauce2Row)
            maybePeekHint(sauce2Row, "sauce")
          }
          const hidden = sauce2Row ? sauce2Row.querySelector('input[data-role="sauce-value"]') : null
          if(hidden) hidden.value = name
          updateSaucePickerLabel("sauce2")
          const display = sauce2Row ? sauce2Row.querySelector('[data-role="sauce-display"]') : null
          flashPickerSelection(display)
        } else {
          const sauce2Row = document.querySelector("#sauce2List .sauce-row")
          const hidden = sauce2Row ? sauce2Row.querySelector('input[data-role="sauce-value"]') : null
          if(hidden) hidden.value = name
          updateSaucePickerLabel("sauce2")
          const display = sauce2Row ? sauce2Row.querySelector('[data-role="sauce-display"]') : null
          flashPickerSelection(display)
        }

        saveRecentItem("sauce", name)
        updateSauce2Visibility()
        closeQuickSearch()
        calc()
      }
    }

    itemsEl.appendChild(row)
  }

  if(mainMatches.length){
    renderSectionTitle("口味 Flavor")
    mainMatches.forEach(renderMainItem)
  }

  if(addonMatches.length){
    renderSectionTitle("加料 Add-ons")
    addonMatches.forEach(renderAddonItem)
  }

  if(sauceMatches.length){
    renderSectionTitle("醬料 Sauce")
    sauceMatches.forEach(renderSauceItem)
  }
}

function init(){
let main = document.getElementById("main")
main.innerHTML = '<option value="">請選擇</option>'

// --- main category buttons ---
mainGroups = buildGroups(mainSeedGroups, Object.keys(data.main), "其他")
mainActiveGroup = Object.keys(mainGroups).find(g => (mainGroups[g] || []).length > 0) || ""

Object.keys(data.main).forEach(name=>{
  let en = mainNameMap[name] || ""
  const label = en ? `${name} ${en}` : name;
  main.innerHTML += `<option value="${name}">${label}</option>`;
})

main.value = ""
updateMainPickerLabel()

const doubleToggle = document.getElementById("double")
if(doubleToggle && doubleToggle.dataset.bound !== "1"){
  doubleToggle.dataset.bound = "1"
  doubleToggle.addEventListener("change", ()=>{
    calc()
  })
}

document.getElementById("sauce1").value = ""
updateSaucePickerLabel("sauce1")
updateSauce2Visibility()

updateAddonUI()
ensureMainSwipeAction()
ensureSauce1SwipeAction()
refreshSwipeValueFlags()
updateSwipeHints()
updateHistoryButton()

calc()
}

function createAddonSelect(removable = true){
  const wrapper = document.createElement("div")
  wrapper.className = "addon-row"
  wrapper.classList.add("swipe-row")
  wrapper.dataset.swipeHintType = "addon"

  wrapper.style.display = "block"
  wrapper.style.position = "relative"
  wrapper.style.overflow = "hidden"

  const display = document.createElement("div")
  display.className = "picker-field picker-field-fill picker-field--placeholder"
  makeKeyboardClickable(display)
  display.textContent = "尚未選擇加料"
  display.onclick = (e)=>{
    e.stopPropagation()
    if(isPickerTapSuppressed()) return
    openAddonPicker(addonActiveGroup, wrapper)
  }

  const hiddenValue = document.createElement("input")
  hiddenValue.type = "hidden"
  hiddenValue.dataset.role = "addon-value"
  hiddenValue.value = ""

  wrapper.appendChild(display)
  wrapper.appendChild(hiddenValue)

  if(removable){
    wrapper.dataset.removable = "1"
    const actionBtn = document.createElement("button")
    actionBtn.type = "button"
    actionBtn.dataset.role = "swipe-action"
    actionBtn.className = "swipe-clear-btn"
    actionBtn.textContent = "Delete"
    wrapper.appendChild(actionBtn)
    attachSwipeToReveal(wrapper, ()=>{
      removeRowWithAnimation(wrapper, ()=>{
        updateAddonUI()
        calc()
      })
    }, ()=>{
      const hidden = wrapper.querySelector('input[data-role="addon-value"]')
      return !!(hidden && hidden.value)
    })
  }

  return wrapper
}

function setAddonValue(wrapper, value){
  const hidden = wrapper.querySelector('input[data-role="addon-value"]')
  const display = wrapper.firstElementChild
  if(!hidden || !display) return
  hidden.value = value || ""
  if(!value){
    display.textContent = "選擇加料"
    display.classList.add("picker-field--placeholder")
    return
  }
  const en = addonNameMap[value] || ""
  setBilingualPickerText(display, value, en)
  display.classList.remove("picker-field--placeholder")
  refreshSwipeValueFlags()
}

function addAddon(defaultValue = ""){
  haptic();
  const container = document.getElementById("addonList")
  if(!defaultValue){
    openAddonPicker(addonActiveGroup)
    return false
  }
  if(isAddonDuplicate(defaultValue)){
    return false
  }

  // Always allow remove (first add-on is now removable)
  const wrapper = createAddonSelect(true)
  setAddonValue(wrapper, defaultValue)

  container.appendChild(wrapper)
  animateRowEnter(wrapper)
  flashPickerSelection(wrapper.querySelector(".picker-field"))
  // First addon ever — show peek hint so user discovers swipe-to-delete
  const addonRows = document.querySelectorAll("#addonList .addon-row")
  if(addonRows.length === 1) maybePeekHint(wrapper, "addon")
  updateAddonUI()
  calc()
  return true
}

function updateAddonUI(){
  const count = document.querySelectorAll("#addonList .addon-row").length
  const label = document.getElementById("addonLabel")
  const emptyPicker = document.getElementById("addonEmptyPicker")
  label.textContent = count > 0 ? `Add-ons (${count})` : "Add-ons"
  if(emptyPicker){
    emptyPicker.style.display = "flex"
    emptyPicker.textContent = count === 0 ? "加入加料" : "再加一項"
    emptyPicker.classList.toggle("picker-field--placeholder", count === 0)
    emptyPicker.classList.add("picker-field--plus")
  }
  updateSectionClearButtons()
  refreshSwipeValueFlags()
  updateSwipeHints()
}

function getSauceDisplayText(value){
  if(!value) return "選擇醬料"
  const en = sauceNameMap[value] || ""
  return en ? `${value} ${en}` : value
}

function updateSauce2Visibility(){
  const sauce1Value = document.getElementById("sauce1").value
  const list = document.getElementById("sauce2List")
  const emptyPicker = document.getElementById("sauce2EmptyPicker")
  if(!list || !emptyPicker) return
  const wasVisible = emptyPicker.style.display !== "none"

  if(!sauce1Value){
    list.innerHTML = ""
    emptyPicker.style.display = "none"
    updateSectionClearButtons()
    refreshSwipeValueFlags()
    updateSwipeHints()
    return
  }

  const hasSecondSauceRow = list.children.length > 0
  const shouldShowPlus = !hasSecondSauceRow
  emptyPicker.style.display = shouldShowPlus ? "flex" : "none"
  if(shouldShowPlus && !wasVisible){
    animatePickerAppear(emptyPicker)
  }
  updateSectionClearButtons()
  refreshSwipeValueFlags()
  updateSwipeHints()
}

function updateSaucePickerLabel(target = "sauce1"){
  if(target === "sauce1"){
    const picker = document.getElementById("sauce1Picker")
    const value = document.getElementById("sauce1").value
    if(!picker) return
    if(!value){
      picker.textContent = getSauceDisplayText(value)
      picker.classList.remove("picker-field--bilingual-break")
      picker.classList.add("picker-field--placeholder")
      picker.classList.add("picker-field--plus")
      picker.classList.remove("picker-field-with-minus")
    } else {
      const en = sauceNameMap[value] || ""
      setBilingualPickerText(picker, value, en)
      picker.classList.remove("picker-field--placeholder")
      picker.classList.remove("picker-field--plus")
      picker.classList.remove("picker-field-with-minus")
    }
    updateSauce2Visibility()
    refreshSwipeValueFlags()
    return
  }

  const row = document.querySelector("#sauce2List .sauce-row")
  if(!row) return
  const hidden = row.querySelector('input[data-role="sauce-value"]')
  const display = row.querySelector('[data-role="sauce-display"]')
  const value = hidden ? hidden.value : ""
  if(display){
    if(!value){
      display.textContent = "選擇第二種醬"
      display.classList.remove("picker-field--bilingual-break")
      display.classList.add("picker-field--placeholder")
      display.classList.add("picker-field--plus")
      display.classList.remove("picker-field-with-minus")
    } else {
      const en = sauceNameMap[value] || ""
      setBilingualPickerText(display, value, en)
      display.classList.remove("picker-field--placeholder")
      display.classList.remove("picker-field--plus")
      display.classList.remove("picker-field-with-minus")
    }
  }
  updateSectionClearButtons()
  refreshSwipeValueFlags()
  updateSwipeHints()
}


function openSaucePicker(target = "sauce1"){
  const modal = document.getElementById("sauceModal")
  if(!modal) return

  saucePickerTarget = target
  openModal("sauceModal")
  renderSauceItems()

  modal.onclick = (e)=>{
    if(e.target.id === "sauceModal") closeModal("sauceModal")
  }
}

function renderSauceItems(){
  const itemsEl = document.getElementById("sauceItems")
  if(!itemsEl) return

  itemsEl.innerHTML = ""

  const target = saucePickerTarget

  const sauce1Value = document.getElementById("sauce1").value
  const sauce2ValueInput = document.querySelector('#sauce2List input[data-role="sauce-value"]')
  const sauce2Value = sauce2ValueInput ? sauce2ValueInput.value : ""
  const selectedValue = target === "sauce1" ? sauce1Value : sauce2Value
  const otherSauceValue = target === "sauce2" ? sauce1Value : sauce2Value
  const isBlocked = (name)=> !!otherSauceValue && name === otherSauceValue && name !== selectedValue
  const sortedSauceNames = Object.keys(data.sauce)
    .sort((a,b)=> data.sauce[b].cal - data.sauce[a].cal)
  const recentSauceNames = getRecentItems("sauce", sortedSauceNames)
    .filter(name => !isBlocked(name))
  const showRecentShortcuts = recentSauceNames.length > 0

  if(!showRecentShortcuts && !sortedSauceNames.length){
    const empty = document.createElement("div")
    empty.style.padding = "14px 12px"
    empty.style.fontSize = "13px"
    empty.style.color = "#8e8e93"
    empty.textContent = "目前沒有可選醬料"
    itemsEl.appendChild(empty)
    return
  }
  const renderSauceItem = (name)=>{
    const div = document.createElement("div")
    div.style.padding = "12px"
    div.style.borderBottom = "1px solid #eee"
    div.style.cursor = "pointer"
    div.style.display = "flex"
    div.style.justifyContent = "space-between"
    div.style.alignItems = "center"
    const en = sauceNameMap[name] || ""
    const textWrap = document.createElement("div")
    textWrap.className = "modal-item-title"
    setBilingualModalTitle(textWrap, name, en)
    textWrap.style.paddingRight = "10px"
    const rightWrap = createModalMetaWrap(`${data.sauce[name].cal} kcal`, {
      showCheck: name === selectedValue
    })
    div.appendChild(textWrap)
    div.appendChild(rightWrap)

    if(isBlocked(name) || name === selectedValue){
      div.style.opacity = "0.45"
      div.style.cursor = "not-allowed"
    }

    div.onclick = ()=>{
      if(isBlocked(name) || name === selectedValue) return
      if(target === "sauce1"){
        document.getElementById("sauce1").value = name
      } else {
        const row = document.querySelector("#sauce2List .sauce-row")
        const hidden = row ? row.querySelector('input[data-role="sauce-value"]') : null
        if(hidden) hidden.value = name
      }
      saveRecentItem("sauce", name)
      updateSaucePickerLabel(target)
      flashPickerSelection(
        target === "sauce1"
          ? document.getElementById("sauce1Picker")
          : document.querySelector("#sauce2List .sauce-row [data-role='sauce-display']")
      )
      closeModal("sauceModal")
      calc()
    }

    itemsEl.appendChild(div)
  }

  if(showRecentShortcuts){
    renderRecentShortcutSection(
      itemsEl,
      recentSauceNames,
      (name)=> name,
      (name)=>{
        if(isBlocked(name)) return
        if(target === "sauce1"){
          document.getElementById("sauce1").value = name
        } else {
          const row = document.querySelector("#sauce2List .sauce-row")
          const hidden = row ? row.querySelector('input[data-role="sauce-value"]') : null
          if(hidden) hidden.value = name
        }
        saveRecentItem("sauce", name)
        updateSaucePickerLabel(target)
        flashPickerSelection(
          target === "sauce1"
            ? document.getElementById("sauce1Picker")
            : document.querySelector("#sauce2List .sauce-row [data-role='sauce-display']")
        )
        closeModal("sauceModal")
        calc()
      }
    )
  }

  sortedSauceNames.forEach(renderSauceItem)
}

function createSauceSelect(){
  const wrapper = document.createElement("div")
  wrapper.className = "sauce-row stack-gap"
  wrapper.classList.add("swipe-row")
  wrapper.dataset.swipeHintType = "sauce"
  wrapper.onclick = ()=>{
    if(isPickerTapSuppressed()) return
    openSaucePicker("sauce2")
  }

  wrapper.style.display = "block"
  wrapper.style.position = "relative"

  const display = document.createElement("div")
  display.dataset.role = "sauce-display"
  display.className = "picker-field picker-field-fill picker-field--placeholder picker-field--plus"
  makeKeyboardClickable(display)
  display.textContent = "選擇第二種醬"
  display.onclick = (e)=>{
    e.stopPropagation()
    if(isPickerTapSuppressed()) return
    openSaucePicker("sauce2")
  }

  const hiddenValue = document.createElement("input")
  hiddenValue.type = "hidden"
  hiddenValue.dataset.role = "sauce-value"
  hiddenValue.value = ""

  wrapper.appendChild(display)
  wrapper.appendChild(hiddenValue)
  const actionBtn = document.createElement("button")
  actionBtn.type = "button"
  actionBtn.dataset.role = "swipe-action"
  actionBtn.className = "swipe-clear-btn"
  actionBtn.textContent = "Delete"
  wrapper.appendChild(actionBtn)
  attachSwipeToReveal(wrapper, ()=>{
    removeRowWithAnimation(wrapper, ()=>{
      updateSauce2Visibility()
      calc()
    })
  }, ()=> !!hiddenValue.value)

  return wrapper
}

function addSauce2Internal(){
  const container = document.getElementById("sauce2List")
  const existingRow = container.querySelector(".sauce-row")
  if(existingRow){
    if(existingRow.classList.contains("removing")){
      setTimeout(()=> addSauce2Internal(), 200)
    }
    return
  }

  const item = createSauceSelect()
  container.appendChild(item)
  animateRowEnter(item)
  updateSauce2Visibility()

  openSaucePicker("sauce2")
}

function addSauce2(){
  if(isPickerTapSuppressed()) return
  addSauce2Internal()
}

function clearSauceSection(){
  const sauce1 = document.getElementById("sauce1")
  if(!sauce1) return

  const sauce2List = document.getElementById("sauce2List")
  sauce1.value = ""
  if(sauce2List) sauce2List.innerHTML = ""
  updateSaucePickerLabel("sauce1")
  refreshSwipeValueFlags()
  updateSwipeHints()
  animatePickerAppear(document.getElementById("sauce1Picker"))
  calc()
}

function clearSauce1Single(){
  const sauce1 = document.getElementById("sauce1")
  if(!sauce1) return
  const sauce2ValueInput = document.querySelector('#sauce2List input[data-role="sauce-value"]')
  const sauce2Value = sauce2ValueInput ? sauce2ValueInput.value : ""
  const sauce2List = document.getElementById("sauce2List")
  if(sauce2Value){
    sauce1.value = sauce2Value
  } else {
    sauce1.value = ""
  }
  if(sauce2List) sauce2List.innerHTML = ""
  updateSaucePickerLabel("sauce1")
  refreshSwipeValueFlags()
  updateSwipeHints()
  calc()
}

function ensureSauce1SwipeAction(){
  const row = document.getElementById("sauce1Row")
  if(!row || row.dataset.clearReady === "1") return
  row.dataset.clearReady = "1"
  row.classList.add("swipe-row")
  row.dataset.swipeHintType = "sauce"

  const actionBtn = document.createElement("button")
  actionBtn.type = "button"
  actionBtn.dataset.role = "swipe-action"
  actionBtn.className = "swipe-clear-btn"
  actionBtn.textContent = "Delete"
  row.appendChild(actionBtn)

  attachSwipeToReveal(row, ()=>{
    clearSauce1Single()
  }, ()=> !!document.getElementById("sauce1").value)
}

function clearAddonSection(){
  const addonList = document.getElementById("addonList")
  if(addonList) addonList.innerHTML = ""
  updateAddonUI()
  refreshSwipeValueFlags()
  updateSwipeHints()
  calc()
}

function updateSectionClearButtons(){
  refreshSwipeValueFlags()
}

let lastCal = 0;
let lastProtein = 0;
let resultEnabled = false;
let resultMode = "";
let resultDetailsExpanded = false;
let lastMainForFeedback = "";
let saucePickerTarget = "sauce1"

function animateNumber(el, start, end, decimals=1, duration=300) {
  if(!el) return
  // Cancel any in-flight tween on this element so rapid recalcs don't spawn
  // overlapping RAF loops fighting over the same textContent (jitter/flicker).
  if(el._numRaf) cancelAnimationFrame(el._numRaf)
  if(start === end){
    el.textContent = end.toFixed(decimals)
    el._numRaf = null
    return
  }
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = start + (end - start) * eased;
    el.textContent = value.toFixed(decimals);
    if (progress < 1) {
      el._numRaf = requestAnimationFrame(step);
    } else {
      el._numRaf = null;
    }
  }
  el._numRaf = requestAnimationFrame(step);
}

function bumpResultStat(el){
  if(!el) return
  const row = el.closest(".result-hero-stat")
  if(!row) return
  row.classList.remove("stat-bump")
  void row.offsetWidth
  row.classList.add("stat-bump")
}

function showResultHint(){
  const resultEl = document.getElementById("result")
  if(resultMode !== "hint"){
    resultEl.innerHTML = `<div style="font-size:14px;line-height:1.4;color:#8e8e93;font-weight:500;letter-spacing:0.01em;">可選擇醬料，或留空不加醬 Sauce is optional</div>`
    resultMode = "hint"
  }
}

function showResultStats(summaryText, breakdownHtml, options = {}){
  resultMode = "stats"
}

function toggleResultDetails(){
  // breakdown removed — action bar has no expandable section
}

function bindResultCardTap(){
  // no-op: action bar has dedicated buttons only
}

function triggerResultPop(){
  // sticky result card removed
}

function showCopyToast(text){
  let toast = document.getElementById("copyToast")
  if(!toast){
    toast = document.createElement("div")
    toast.id = "copyToast"
    toast.className = "copy-toast"
    document.body.appendChild(toast)
  }
  toast.textContent = text
  toast.classList.add("show")
  if(copyToastTimer) clearTimeout(copyToastTimer)
  copyToastTimer = setTimeout(()=>{
    toast.classList.remove("show")
  }, 1200)
}

function copyResultSummary(){
  if(!lastShareText) return

  const btn = document.getElementById("copyShareBtn")
  const copiedAria = "已複製 Copied"
  const defaultAria = "複製結果 Copy result"
  const setCopiedLabel = ()=>{
    if(!btn) return
    btn.classList.add("copied")
    btn.setAttribute("aria-label", copiedAria)
    btn.setAttribute("title", copiedAria)
    const textEl = btn.querySelector(".hero-btn-text")
    if(textEl) textEl.textContent = "已複製"
    if(copyShareResetTimer) clearTimeout(copyShareResetTimer)
    copyShareResetTimer = setTimeout(()=>{
      btn.classList.remove("copied")
      btn.setAttribute("aria-label", defaultAria)
      btn.setAttribute("title", defaultAria)
      if(textEl) textEl.textContent = "複製"
    }, 1800)
  }

  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(lastShareText).then(setCopiedLabel).catch(()=>{})
    return
  }

  const ta = document.createElement("textarea")
  ta.value = lastShareText
  ta.style.position = "fixed"
  ta.style.opacity = "0"
  document.body.appendChild(ta)
  ta.focus()
  ta.select()
  try {
    document.execCommand("copy")
    setCopiedLabel()
  } catch (_) {
    // no-op
  }
  document.body.removeChild(ta)
}

function calc(){
let total = {cal:0, protein:0}
let breakdown = []
const resultEl = document.getElementById("result")

let main = document.getElementById("main").value
  if(!main){
  resultEnabled = false
  resultMode = ""
  resultDetailsExpanded = false
  lastMainForFeedback = ""
  lastCal = 0
  lastProtein = 0
  if(resultEl){
    resultEl.classList.remove("is-shown", "pop")
  }
  const heroStats = document.getElementById("heroStats")
  const heroEmpty = document.getElementById("heroEmptyState")
  if(heroStats) heroStats.style.display = "none"
  if(heroEmpty) heroEmpty.style.display = ""
  updateResultVisibility()
  return
}

if(main && data.main[main]){
  total.cal += data.main[main].cal
  total.protein += data.main[main].protein
  breakdown.push(formatBreakdownNutritionLine(main, data.main[main]))
}

if(document.getElementById("double").checked && main){
  const doubleMeatKey = doubleMeatMap[main] || main
  const doubleMeatData = data.addon[doubleMeatKey]
  if(doubleMeatData){
    total.cal += doubleMeatData.cal
    total.protein += doubleMeatData.protein
    breakdown.push(formatBreakdownNutritionLine(`雙份肉 ${main}`, doubleMeatData))
  }
}

const addonRows = document.querySelectorAll("#addonList .addon-row")
const selectedAddonNames = []

addonRows.forEach(row=>{
  const hidden = row.querySelector('input[data-role="addon-value"]')
  let name = hidden ? hidden.value : ""
  if(name && data.addon[name]){
    selectedAddonNames.push(name)
    total.cal += data.addon[name].cal
    total.protein += data.addon[name].protein
    breakdown.push(formatBreakdownNutritionLine(name, data.addon[name]))
  }
})

let sauce1 = document.getElementById("sauce1").value
const sauce2ValueInput = document.querySelector('#sauce2List input[data-role="sauce-value"]')
let sauce2 = sauce2ValueInput ? sauce2ValueInput.value : ""
const sauce2Visible = !!sauce2ValueInput

if(sauce1 && sauce2Visible && sauce2){
  // both sauces → each half
  total.cal += data.sauce[sauce1].cal / 2
  total.cal += data.sauce[sauce2].cal / 2
  breakdown.push(`${sauce1}: ${data.sauce[sauce1].cal / 2} kcal`)
  breakdown.push(`${sauce2}: ${data.sauce[sauce2].cal / 2} kcal`)
} else if(sauce1){
  total.cal += data.sauce[sauce1].cal
  breakdown.push(`${sauce1}: ${data.sauce[sauce1].cal} kcal`)
}

const selectedSauceCount = (sauce1 ? 1 : 0) + (sauce2 ? 1 : 0)
const isDoubleMeat = document.getElementById("double").checked
const mainPortions = isDoubleMeat ? 2 : 1
const totalEfficiency = getPer100KcalText(total.protein, total.cal)
const countsSummary = `主餐 ${mainPortions} 份 + 加料 ${selectedAddonNames.length} 份 + 醬料 ${selectedSauceCount} 種`
const nutritionSummaryHtml = formatNutritionSummaryHtml(total.cal, total.protein)
const summaryHtml = `${escapeHtml(countsSummary)} · ${nutritionSummaryHtml}`
showResultStats(summaryHtml, breakdown.join("<br>"), { summaryHtml: true, cal: total.cal, protein: total.protein })
const mainChanged = main !== lastMainForFeedback

const sauceShareText = []
if(sauce1) sauceShareText.push(getSauceDisplayText(sauce1))
if(sauce2) sauceShareText.push(getSauceDisplayText(sauce2))
if(!sauceShareText.length) sauceShareText.push("不加醬 No sauce")

const zhMainBase = `6吋${main}${isDoubleMeat ? "雙份肉" : ""}`
const zhAddon = selectedAddonNames.map(compactZhShareName).join(" + ")
const zhMainWithAddon = zhAddon ? `${zhMainBase} + ${zhAddon}` : zhMainBase
const zhSauce = sauce1
  ? [sauce1, sauce2].filter(Boolean).join(" + ")
  : "不加醬"

const mainEn = mainNameMap[main] || main
const enAddon = selectedAddonNames
  .map(name => addonNameMap[name] || name)
  .join(" + ")
const enMainWithAddon = `${`6" ${mainEn}`}${isDoubleMeat ? " double meat" : ""}${enAddon ? ` + ${enAddon}` : ""}`
const enSauce = sauce1
  ? [sauce1, sauce2].filter(Boolean).map(name => sauceNameMap[name] || name).join(" + ")
  : "No sauce"

const metricLine = totalEfficiency
  ? `${formatKcal(total.cal)} kcal | ${formatProtein(total.protein)} g | ${totalEfficiency}`
  : `${formatKcal(total.cal)} kcal | ${formatProtein(total.protein)} g`
const zhShareLine = `${zhMainWithAddon} | ${zhSauce}`
const enShareLine = `${enMainWithAddon} | ${enSauce}`

lastShareText =
`${metricLine}
${zhShareLine}
${enShareLine}`

const calEl = document.getElementById("calVal")
const proEl = document.getElementById("proVal")

const calDecimals = (Math.round(total.cal * 10) % 10 === 0) ? 0 : 1
const calChanged = Math.abs(total.cal - lastCal) > 0.05
const proteinChanged = Math.abs(total.protein - lastProtein) > 0.05

animateNumber(calEl, lastCal, total.cal, calDecimals)
animateNumber(proEl, lastProtein, total.protein, 0)
if(calChanged) bumpResultStat(calEl)
if(proteinChanged) bumpResultStat(proEl)

// Hero result
const heroStats = document.getElementById("heroStats")
const heroEmpty = document.getElementById("heroEmptyState")
const heroCalEl = document.getElementById("heroCalVal")
const heroProEl = document.getElementById("heroProVal")
const heroEffEl = document.getElementById("heroEfficiency")
if(heroStats) heroStats.style.display = ""
if(heroEmpty) heroEmpty.style.display = "none"
animateNumber(heroCalEl, lastCal, total.cal, calDecimals)
animateNumber(heroProEl, lastProtein, total.protein, 0)
if(heroEffEl) heroEffEl.textContent = totalEfficiency ? `· ${totalEfficiency}` : ""

lastCal = total.cal
lastProtein = total.protein
lastMainForFeedback = main

  resultEnabled = true
  updateSaveButtonState()

  if(mainChanged || !resultEl.classList.contains("is-shown")){
    triggerResultPop()
    if (navigator.vibrate) navigator.vibrate(5)
  }
  updateResultVisibility()
}

const SHEET_DESKTOP_MQ = window.matchMedia("(min-width: 940px)")

function sheetPanelTransform(translateY) {
  const centerX = SHEET_DESKTOP_MQ.matches ? "translateX(-50%)" : ""
  if (!translateY) return centerX
  return centerX ? `${centerX} ${translateY}` : translateY
}

function attachSwipeToDismiss(panel, closeFn) {
  if (!panel || panel.dataset.swipeDismissReady === "1") return
  panel.dataset.swipeDismissReady = "1"

  const grabberWrap = panel.querySelector(".sheet-grabber-wrap")
  const itemsEl = panel.querySelector(".modal-items")
  const THRESHOLD = 88, VELOCITY = 0.42
  let touchDragActive = false

  function canStartTouchDrag(target) {
    if (target.closest(".sheet-grabber-wrap")) return true
    if (target.closest("input, textarea, select, button, a, [role='button'], .modal-categories")) return false
    if (target.closest(".modal-items")) return !itemsEl || itemsEl.scrollTop <= 0
    return true
  }

  // Each drag sequence is fully self-contained — touchmove/touchend are
  // captured on document so iOS cannot intercept them mid-gesture.
  function startDrag(startClientY) {
    if (touchDragActive) return
    touchDragActive = true
    let currentY = startClientY
    let startTime = Date.now()
    let isDragging = false

    panel.style.transition = "none"

    function onMove(e) {
      currentY = e.touches[0].clientY
      const dy = currentY - startClientY
      if (!isDragging) {
        if (dy > 6)       isDragging = true
        else if (dy < -4) { finish(); return }
        else              return
      }
      if (isDragging) e.preventDefault()
      panel.style.transform = sheetPanelTransform(`translateY(${Math.max(0, dy)}px)`)
    }

    function finish() {
      document.removeEventListener("touchmove", onMove)
      document.removeEventListener("touchend",  finish)
      document.removeEventListener("touchcancel", finish)
      touchDragActive = false
      const dy  = currentY - startClientY
      const vel = dy / Math.max(1, Date.now() - startTime)
      panel.style.transition = "transform 0.26s cubic-bezier(.22,.61,.36,1)"
      if (isDragging && (dy > THRESHOLD || vel > VELOCITY)) {
        panel.style.transform = sheetPanelTransform("translateY(110%)")
        haptic()
        setTimeout(() => { panel.style.transform = ""; panel.style.transition = ""; closeFn() }, 260)
      } else {
        panel.style.transform = ""
        setTimeout(() => { panel.style.transition = "" }, 260)
      }
    }

    document.addEventListener("touchmove",   onMove,  { passive: false })
    document.addEventListener("touchend",    finish)
    document.addEventListener("touchcancel", finish)
  }

  panel.addEventListener("touchstart", (e) => {
    if (!canStartTouchDrag(e.target)) return
    if (e.target.closest(".sheet-grabber-wrap")) e.preventDefault()
    startDrag(e.touches[0].clientY)
  }, { passive: false })

  // ── Grabber: passive:false so e.preventDefault() is allowed ──
  if (grabberWrap) {
    // Desktop mouse drag
    grabberWrap.addEventListener("mousedown", (e) => {
      e.preventDefault()
      const sy = e.clientY
      let cy = e.clientY
      panel.style.transition = "none"
      const mm = (ev) => { cy = ev.clientY; const dy = cy - sy; if (dy > 0) panel.style.transform = sheetPanelTransform(`translateY(${dy}px)`) }
      const mu = () => {
        document.removeEventListener("mousemove", mm)
        document.removeEventListener("mouseup",   mu)
        const dy = cy - sy
        panel.style.transition = "transform 0.26s cubic-bezier(.22,.61,.36,1)"
        if (dy > THRESHOLD) {
          panel.style.transform = sheetPanelTransform("translateY(110%)")
          setTimeout(() => { panel.style.transform = ""; panel.style.transition = ""; closeFn() }, 260)
        } else {
          panel.style.transform = ""
          setTimeout(() => { panel.style.transition = "" }, 260)
        }
      }
      document.addEventListener("mousemove", mm)
      document.addEventListener("mouseup",   mu)
    })
  }

  // Touch drag is handled at the panel level so title/header space and
  // top-scrolled item lists behave like one continuous bottom sheet.
}

function initSwipeToDismiss() {
  const configs = [
    { panelId: "mainModal",       closeFn: () => closeModal("mainModal") },
    { panelId: "addonModal",      closeFn: () => closeModal("addonModal") },
    { panelId: "sauceModal",      closeFn: () => closeModal("sauceModal") },
    { panelId: "quickSearchModal",closeFn: () => closeQuickSearch() },
  ]
  configs.forEach(({ panelId, closeFn }) => {
    const panel = document.querySelector(`#${panelId} .sheet-panel`)
    attachSwipeToDismiss(panel, closeFn)
  })
}

init()
bindResultCardTap()
updateSectionClearButtons()
ensureSauce1SwipeAction()
initSwipeToDismiss()

function updateResultVisibility(){
  // sticky bar removed — hero handles result display
}


window.addEventListener("scroll", () => {
  const logo = document.querySelector(".logo")
  const y = window.scrollY

  updateResultVisibility()

  if(y > 10){
    logo.style.transform = "scale(0.95)"
    logo.style.opacity = "0.9"
  } else {
    logo.style.transform = "scale(1)"
    logo.style.opacity = "1"
  }
})

function resetAll(){
  document.body.classList.add("resetting")
  setTimeout(()=> document.body.classList.remove("resetting"), 360)
  const resetBtn = document.querySelector(".reset-btn")
  if(resetBtn){
    resetBtn.classList.remove("animating")
    void resetBtn.offsetWidth
    resetBtn.classList.add("animating")
  }

  const main = document.getElementById("main")
  main.value = ""
  updateMainPickerLabel()

  document.getElementById("double").checked = false
  document.getElementById("addonList").innerHTML = ""
  addonActiveGroup = Object.keys(addonGroups)[0] || ""

  const sauce1 = document.getElementById("sauce1")
  sauce1.value = ""
  updateSaucePickerLabel("sauce1")
  updateSauce2Visibility()
  const sauce2List = document.getElementById("sauce2List")
  sauce2List.innerHTML = ""
  updateSauce2Visibility()

  lastCal = 0
  lastProtein = 0
  resultMode = ""
  resultDetailsExpanded = false
  lastMainForFeedback = ""

  closeAllModals({ immediate: true })

  updateAddonUI()
  updateSectionClearButtons()
  calc()
}
