import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeftRight,
  Check,
  Clipboard,
  Download,
  FileSpreadsheet,
  Gift,
  GripVertical,
  ImageDown,
  Search,
  RotateCcw,
  Trash2,
  ListTree,
  Users,
  X,
} from "lucide-react";
import "./styles.css";

const CAPACITY = 10;
const GIFT_MODEL_VERSION = "household-v2";

const tablePositions = [
  ["01", 39, 18, "主"],
  ["02", 62, 18, "6"],
  ["03", 30, 18, "5"],
  ["05", 20, 18, "3"],
  ["06", 72, 18, "7"],
  ["07", 10, 18, "2"],
  ["08", 82, 18, "8"],
  ["09", 39, 34, "15"],
  ["10", 92, 18, "9"],
  ["11", 30, 34, "12"],
  ["12", 62, 34, "16"],
  ["13", 20, 34, "11"],
  ["15", 10, 34, "10"],
  ["16", 72, 34, "17"],
  ["17", 39, 50, "23"],
  ["18", 82, 34, "18"],
  ["19", 30, 50, "22"],
  ["20", 92, 34, "19"],
  ["21", 20, 50, "21"],
  ["22", 62, 50, "25"],
  ["23", 10, 50, "20"],
  ["25", 39, 66, "32"],
  ["26", 72, 50, "26"],
  ["27", 30, 66, "31"],
  ["28", 82, 50, "27"],
  ["29", 20, 66, "30"],
  ["30", 92, 50, "28"],
  ["31", 10, 66, "29"],
  ["32", 62, 66, "33"],
  ["33", 39, 84, "50"],
  ["35", 30, 84, "39"],
  ["36", 72, 66, "35"],
  ["37", 20, 84, "38"],
  ["50", 82, 66, "36"],
  ["52", 92, 66, "37"],
  ["56", 62, 84, "51"],
  ["58", 72, 84, "52"],
  ["60", 82, 84, "53"],
  ["66", 92, 84, "备"],
];

const seedTables = [
  t("01", "无礼份标注", "", [["男方", 5], ["女方", 5]], 15),
  t("03", "5 份礼", "超 2 人", [["楼华君", 3], ["郭有泉", 1], ["文双华", 4], ["徐伟", 2], ["马新刚", 2]]),
  t("05", "9 份礼", "", [["陆功田", 2], ["丁伟民", 1], ["黄星娣", 1], ["金国君", 2], ["阮国良", 1], ["周新", 1], ["陈敏", 1], ["洪艳丽", 1]]),
  t("07", "6 份礼", "", [["沈建红", 2], ["许敬华", 2], ["杨志", 2], ["许进益", 2], ["郑子光", 1], ["苏文全", 1]]),
  t("09", "无礼份标注", "", [["新娘朋友", 10]]),
  t("11", "无礼份标注", "", [["新娘同事", 10]]),
  t("13", "10 份礼", "", [["罗明", 2], ["磨振佳", 1], ["王健", 2], ["柳玉青", 1], ["李波", 1], ["张传东", 1], ["孟祥宇", 1], ["应奇峰", 1]]),
  t("15", "3 份礼", "", [["魏巍", 3], ["郭树春", 4], ["马云飞", 3]]),
  t("17", "无礼份标注", "", [["新郎同学", 10]]),
  t("19", "无礼份标注", "", [["新郎同事", 10]]),
  t("21", "1 份礼", "", [["汪锦霞", 1], ["余梓铭", 1], ["余梓墨", 1], ["郭思颖", 1], ["余梓丘", 1], ["余梓齐", 1], ["余梓昊", 1], ["余鑫笑", 1], ["余晟韬", 1], ["余晟旭", 1]]),
  t("23", "5 份礼", "", [["刘江明", 2], ["余建军", 2], ["李荣林", 2], ["徐爱冬", 2], ["张明财", 2]]),
  t("25", "5 份礼", "", [["何燕青", 2], ["邹卫龙", 2], ["华炎桃", 2], ["周传发", 2], ["方乃兴", 2]]),
  t("27", "9 份礼", "", [["刘新云", 1], ["叶志军", 1], ["邵志平", 2], ["郭向阳", 1], ["汪的", 1], ["刘成", 1], ["袁岳清", 1], ["施後法", 1], ["陈国兴", 1]]),
  t("29", "5 份礼", "", [["熊化贵", 3], ["程前", 2], ["倪小平", 3], ["徐才虎", 1], ["查大川", 1]]),
  t("31", "3 份礼", "", [["周建平", 3], ["应林祥", 4], ["梁贵山", 3]]),
  t("33", "6 份礼", "缺 1 人", [["邹法龙", 2], ["张顺根", 2], ["邹卫君", 2], ["邱金林", 2], ["何燕明", 1]]),
  t("35", "4 份礼", "", [["胡红燕", 1], ["徐勇", 1], ["晓晓", 3], ["许輝", 1], ["方光正", 1], ["朱如密", 3]]),
  t("37", "4 份礼", "", [["沈海峰", 2], ["汤华萍", 4], ["邹莲君", 2], ["张珍", 2]]),
  t("02", "9 份礼", "", [["程渭山", 1], ["陈艳华", 2], ["郑仓元", 2], ["钱国女", 1], ["余和平", 2], ["方华", 2], ["徐勤根", 1], ["陈先勇", 2], ["张裕", 1], ["常向兵", 1]], 15),
  t("06", "无礼份标注", "", [["周宝富", 1], ["邵军", 2], ["姚志云", 2], ["丁星阳", 1], ["王建辉", 1], ["余太荣", 1], ["余力成", 1]]),
  t("08", "4 份礼", "", [["姜根旺", 2], ["姜立忠", 2], ["吴世峰", 1], ["余满江", 3], ["程浩", 4]]),
  t("10", "4 份礼", "缺 5 人", [["吴世峰", 1], ["唐必文", 1], ["张月初", 2], ["王影萍", 1]]),
  t("12", "10 份礼", "", [["余海富", 1], ["余海峰", 1], ["余志荣", 1], ["余贤忠", 1], ["余志平", 1], ["余志瑾", 1], ["余德军", 1], ["余志雄", 1], ["胡祖平", 1]]),
  t("16", "7 份礼", "", [["童政富", 1], ["汪家喜", 2], ["王建平", 2], ["陈孝将", 2], ["胡军", 2], ["余成亮", 1]]),
  t("18", "7 份礼", "", [["方志红", 2], ["余沪兵", 1], ["程永芬", 2], ["汪洋", 1], ["江伟霞", 2], ["郑建英", 1]]),
  t("20", "3 份礼", "", [["严良英", 1], ["郑夏睿", 1], ["汪国仙", 3], ["余德英", 3], ["王璐", 2]]),
  t("22", "5 份礼", "", [["宋柏槐", 2], ["刘仿强", 2], ["金泽民", 2], ["韩英玲", 2], ["冯旭平", 2]]),
  t("26", "7 份礼", "缺 1 人", [["付兴武", 2], ["叶向华", 2], ["宋冬冬", 1], ["邹武红", 1], ["叶孝红", 1], ["汪贵飞", 1], ["叶孝堂", 1]]),
  t("28", "5 份礼", "", [["汪文波", 3], ["何伟阳", 2], ["郑祥怀", 1], ["程志亮", 2], ["江明", 2]]),
  t("30", "5 份礼", "", [["俞河潮", 1], ["付华女", 1], ["邹卫芬", 4], ["邹小芬", 2], ["项伟", 2]]),
  t("32", "5 份礼", "", [["戴卫群", 2], ["丰建义", 2], ["黄应财", 2], ["何建龙", 2], ["毛春香", 2]]),
  t("36", "10 份礼", "", [["余谳雄", 1], ["余水法", 1], ["余古那", 1], ["余坤标", 1], ["余坤跃", 1], ["余献那", 1], ["胡春标", 1], ["余书红", 1], ["胡舍丹", 1], ["胡金仙", 1]]),
  t("50", "3 份礼", "缺 2 人", [["汪仙兰", 1], ["徐根明", 2], ["余林凤", 1], ["章浩冉", 1], ["余金兰", 1], ["余诗函", 1], ["余诗淼", 1]]),
  t("52", "3 份礼", "", [["邹志锋", 4], ["邹志星", 3], ["王鼎利", 3]]),
  t("56", "4 份礼", "缺 1 人", [["邹雨龙", 4], ["邹文清", 2], ["邹文龙", 2], ["邹顺龙", 1]]),
  t("58", "7 份礼", "", [["徐国和", 1], ["徐正和", 2], ["徐星和", 2], ["徐发和", 2], ["谢正田", 1], ["冬焦", 1], ["余美忠（司机）", 1]]),
  t("60", "6 份礼", "", [["邹鹏", 4], ["汪仙娥", 1], ["余慧芳", 1], ["毛金仙", 1], ["龙猛", 2], ["汪晓剑", 1], ["余贤美", 1]]),
  t("66", "无礼份标注", "备桌", []),
];

function t(id, gifts, note, groups, capacity = CAPACITY) {
  const giftCounts = distributeGiftCounts(groups.length, parseGiftCount(gifts) ? groups.length : 0);
  return {
    id,
    gifts,
    note,
    capacity,
    guests: groups.map(([name, count], index) => ({ id: `${id}-${name}`, name, count, giftCount: giftCounts[index] })),
  };
}

const visualOrder = [...tablePositions]
  .sort((a, b) => a[2] - b[2] || a[1] - b[1])
  .map(([id]) => id);
const positionById = Object.fromEntries(
  tablePositions.map(([id, x, y]) => [id, { x, y, sequence: visualOrder.indexOf(id) + 1 }])
);

function tableCount(table) {
  return table.guests.reduce((sum, guest) => sum + guest.count, 0);
}

function parseGiftCount(gifts) {
  const match = String(gifts || "").match(/(\d+)\s*份/);
  return match ? Number(match[1]) : 0;
}

function distributeGiftCounts(groupCount, totalGifts) {
  if (!groupCount || !totalGifts) return Array(groupCount).fill(0);
  const counts = Array(groupCount).fill(0);
  let remaining = totalGifts;
  for (let index = 0; index < groupCount && remaining > 0; index += 1) {
    counts[index] = 1;
    remaining -= 1;
  }
  let index = 0;
  while (remaining > 0) {
    counts[index % groupCount] += 1;
    remaining -= 1;
    index += 1;
  }
  return counts;
}

function normalizeTable(table) {
  if (table.guests.every((guest) => guest.giftCount !== undefined)) return table;
  const giftCounts = distributeGiftCounts(table.guests.length, parseGiftCount(table.gifts) ? table.guests.length : 0);
  return {
    ...table,
    guests: table.guests.map((guest, index) => ({ ...guest, giftCount: giftCounts[index] ?? 0 })),
  };
}

function resetTableGiftCounts(table) {
  const giftCounts = distributeGiftCounts(table.guests.length, parseGiftCount(table.gifts) ? table.guests.length : 0);
  return {
    ...table,
    guests: table.guests.map((guest, index) => ({ ...guest, giftCount: giftCounts[index] ?? 0 })),
  };
}

function normalizeTables(tables) {
  return tables.map(normalizeTable);
}

function normalizeStagingItems(items) {
  return items.map((item) => ({
    ...item,
    guests: item.guests.map((guest) => ({ ...guest, giftCount: guest.giftCount ?? 1 })),
  }));
}

function tableGiftCount(table) {
  return table.guests.reduce((sum, guest) => sum + (Number(guest.giftCount) || 0), 0);
}

function tableGiftText(table) {
  const count = tableGiftCount(table);
  return count ? `${count} 份礼` : "无礼份标注";
}

function tableNoteText(table) {
  const count = tableCount(table);
  if (table.note.includes("备")) return "备桌";
  if (count > table.capacity) return `超 ${count - table.capacity} 人`;
  if (count < table.capacity) return `缺 ${table.capacity - count} 人`;
  return table.note.replace(/(?:缺|超)\s*\d+\s*人/g, "").trim();
}

function tableStatus(table) {
  const count = tableCount(table);
  if (table.note.includes("备")) return "backup";
  if (count > table.capacity) return "over";
  if (count < table.capacity) return "short";
  return "ok";
}

function guestText(guest) {
  return `${guest.name}${guest.count > 1 ? `（${guest.count}）` : ""}`;
}

function statusText(table) {
  return { ok: "正常", short: "缺人", over: "超员", backup: "备桌" }[tableStatus(table)];
}

function tableRows(sortedTables, staging) {
  const rows = [["桌号", "宾客/组", "人数", "本户礼份", "当前人数", "容量", "状态", "本桌礼份", "备注"]];
  sortedTables.forEach((table) => {
    const count = tableCount(table);
    if (!table.guests.length) {
      rows.push([table.id, "空桌", 0, 0, count, table.capacity, statusText(table), tableGiftText(table), tableNoteText(table)]);
      return;
    }
    table.guests.forEach((guest) => {
      rows.push([table.id, guest.name, guest.count, guest.giftCount ?? 0, count, table.capacity, statusText(table), tableGiftText(table), tableNoteText(table)]);
    });
  });
  staging.forEach((item) => {
    item.guests.forEach((guest) => {
      rows.push(["暂存区", guest.name, guest.count, guest.giftCount ?? 0, "", "", "暂存", "", item.label]);
    });
  });
  return rows;
}

function textSummary(sortedTables, staging, stats) {
  const lines = [
    "婚礼排桌名单",
    `合计：${stats.seats} 位｜${sortedTables.length} 桌｜${stats.warnings} 桌需确认`,
    "",
  ];
  sortedTables.forEach((table) => {
    const guests = table.guests.length ? table.guests.map(guestText).join("、") : "空桌";
    const extra = [tableGiftText(table), tableNoteText(table)].filter(Boolean).join("｜");
    lines.push(`${table.id} 号桌（${tableCount(table)}/${table.capacity}，${statusText(table)}）：${guests}${extra ? `｜${extra}` : ""}`);
  });
  if (staging.length) {
    lines.push("", "暂存区");
    staging.forEach((item) => {
      lines.push(`${item.label}：${item.guests.map(guestText).join("、")}`);
    });
  }
  return lines.join("\n");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeCsv(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function copyToClipboard({ plain, html }) {
  if (html && window.ClipboardItem && navigator.clipboard?.write) {
    await navigator.clipboard.write([
      new window.ClipboardItem({
        "text/plain": new Blob([plain], { type: "text/plain" }),
        "text/html": new Blob([html], { type: "text/html" }),
      }),
    ]);
    return;
  }
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(plain);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = plain;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function wrapLines(text, maxChars) {
  const chunks = [];
  let line = "";
  Array.from(text).forEach((char) => {
    if (line.length >= maxChars) {
      chunks.push(line);
      line = char;
      return;
    }
    line += char;
  });
  if (line) chunks.push(line);
  return chunks.length ? chunks : [""];
}

function buildSeatingSvg(sortedTables, staging, stats) {
  const width = 4000;
  const height = 3100;
  const cardWidth = 330;
  const xSlots = { 10: 480, 20: 850, 30: 1220, 39: 1590, 62: 2410, 72: 2780, 82: 3150, 92: 3520 };
  const ySlots = { 18: 720, 34: 1080, 50: 1440, 66: 1800, 84: 2240 };
  const colors = {
    ok: "#67987b",
    short: "#e5902a",
    over: "#c94262",
    backup: "#999999",
  };
  const cards = sortedTables.map((table) => {
    const pos = positionById[table.id];
    const centerX = xSlots[pos.x] ?? 2000;
    const centerY = ySlots[pos.y] ?? 1500;
    const guestLines = table.guests.length
      ? table.guests.flatMap((guest, index) => wrapLines(`${index + 1}. ${guestText(guest)}`, 17))
      : ["空桌"];
    const metaLines = [tableGiftText(table), tableNoteText(table)].filter(Boolean).flatMap((item) => wrapLines(item, 19));
    const cardHeight = Math.max(230, 92 + guestLines.length * 20 + metaLines.length * 18);
    const x = centerX - cardWidth / 2;
    const y = centerY - cardHeight / 2;
    const status = tableStatus(table);
    const guestTextNodes = guestLines.map((line, index) => (
      `<text x="${x + 22}" y="${y + 88 + index * 20}" font-size="17" font-weight="700" fill="#343b36">${escapeHtml(line)}</text>`
    )).join("");
    const metaStartY = y + 98 + guestLines.length * 20;
    const metaTextNodes = metaLines.map((line, index) => (
      `<text x="${x + 22}" y="${metaStartY + index * 18}" font-size="15" font-weight="800" fill="#717a73">${escapeHtml(line)}</text>`
    )).join("");
    return `
      <g>
        <rect x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" rx="18" fill="#ffffff" stroke="${colors[status]}" stroke-width="4"/>
        <rect x="${x}" y="${y}" width="${cardWidth}" height="66" rx="18" fill="#fff7f1"/>
        <circle cx="${x + 36}" cy="${y + 33}" r="22" fill="${colors[status]}"/>
        <text x="${x + 36}" y="${y + 41}" text-anchor="middle" font-size="23" font-weight="900" fill="#ffffff">${escapeHtml(pos.sequence)}</text>
        <text x="${x + 70}" y="${y + 30}" font-size="27" font-weight="900" fill="#1e2320">${escapeHtml(table.id)} 号桌</text>
        <text x="${x + 70}" y="${y + 55}" font-size="18" font-weight="800" fill="${colors[status]}">${tableCount(table)}/${table.capacity} · ${escapeHtml(statusText(table))}</text>
        ${guestTextNodes}
        ${metaTextNodes}
      </g>`;
  }).join("");
  const stagingLines = staging.length
    ? staging.flatMap((item) => wrapLines(`${item.label}：${item.guests.map(guestText).join("、")}`, 116))
    : ["暂无暂存宾客"];
  const stagingY = 2920;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="#fffaf7"/>
      <rect x="80" y="145" width="3840" height="2720" rx="34" fill="#fff4ec" stroke="#eaded6" stroke-width="5"/>
      <text x="110" y="78" font-size="50" font-weight="900" fill="#1e2320">婚礼席位图</text>
      <text x="500" y="78" font-size="27" font-weight="800" fill="#717a73">${stats.seats} 位 · ${sortedTables.length} 桌 · ${stats.warnings} 桌需确认 · 保留宴会厅桌位布局</text>
      <g transform="translate(${width - 690} 58)">
        <circle cx="0" cy="0" r="12" fill="${colors.ok}"/><text x="22" y="8" font-size="22" font-weight="800" fill="#717a73">正常</text>
        <circle cx="110" cy="0" r="12" fill="${colors.short}"/><text x="132" y="8" font-size="22" font-weight="800" fill="#717a73">缺人</text>
        <circle cx="220" cy="0" r="12" fill="${colors.over}"/><text x="242" y="8" font-size="22" font-weight="800" fill="#717a73">超员</text>
        <circle cx="330" cy="0" r="12" fill="${colors.backup}"/><text x="352" y="8" font-size="22" font-weight="800" fill="#717a73">备桌</text>
      </g>
      <rect x="1680" y="205" width="640" height="118" rx="18" fill="#ffe4e2" stroke="#ebc8c4" stroke-width="5"/>
      <text x="2000" y="282" text-anchor="middle" font-size="52" font-weight="900" fill="#b2334d">舞台</text>
      <circle cx="2000" cy="1600" r="155" fill="#f9dcd9" stroke="#fff1e8" stroke-width="26"/>
      <text x="2000" y="1588" text-anchor="middle" font-size="40" font-weight="900" fill="#af3249">圆岛</text>
      <text x="2000" y="1640" text-anchor="middle" font-size="40" font-weight="900" fill="#af3249">舞台</text>
      <rect x="1912" y="1800" width="176" height="910" rx="28" fill="#ffe6e1" stroke="#e5c3bc" stroke-width="4" opacity="0.72"/>
      <text x="2000" y="2260" text-anchor="middle" font-size="30" font-weight="900" fill="#c77a76" transform="rotate(90 2000 2260)">通道</text>
      ${cards}
      <rect x="110" y="${stagingY}" width="3780" height="${70 + stagingLines.length * 28}" rx="18" fill="#ffffff" stroke="#eaded6" stroke-width="3"/>
      <text x="138" y="${stagingY + 44}" font-size="26" font-weight="900" fill="#1e2320">暂存区</text>
      ${stagingLines.map((line, index) => `<text x="260" y="${stagingY + 44 + index * 28}" font-size="22" font-weight="700" fill="#454b47">${escapeHtml(line)}</text>`).join("")}
    </svg>`;
}

async function seatingImageBlob(sortedTables, staging, stats) {
  const svg = buildSeatingSvg(sortedTables, staging, stats);
  const imageUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  const image = new Image();
  image.decoding = "async";
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = imageUrl;
  });
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth || 2400;
  canvas.height = image.naturalHeight || 1700;
  const context = canvas.getContext("2d");
  context.fillStyle = "#fffaf7";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0);
  URL.revokeObjectURL(imageUrl);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("无法生成图片"));
    }, "image/png");
  });
}

async function copyImageToClipboard(blob) {
  if (!window.ClipboardItem || !navigator.clipboard?.write) {
    throw new Error("当前浏览器不支持复制图片");
  }
  await navigator.clipboard.write([
    new window.ClipboardItem({ "image/png": blob }),
  ]);
}

function App() {
  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem("wedding-seating-v1");
    if (!saved) return normalizeTables(seedTables);
    const parsed = JSON.parse(saved).map((table) => (
      table.id === "01" && table.capacity === 10 ? { ...table, capacity: 15 } : table
    ));
    if (localStorage.getItem("wedding-seating-gift-model") !== GIFT_MODEL_VERSION) {
      const migrated = normalizeTables(parsed.map(resetTableGiftCounts));
      localStorage.setItem("wedding-seating-v1", JSON.stringify(migrated));
      localStorage.setItem("wedding-seating-gift-model", GIFT_MODEL_VERSION);
      return migrated;
    }
    return normalizeTables(parsed);
  });
  const [staging, setStaging] = useState(() => {
    const saved = localStorage.getItem("wedding-seating-staging-v1");
    return saved ? normalizeStagingItems(JSON.parse(saved)) : [];
  });
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [targetId, setTargetId] = useState("66");
  const [pickedGuestId, setPickedGuestId] = useState(null);
  const [showGuests, setShowGuests] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");

  const selected = selectedId ? tables.find((table) => table.id === selectedId) : null;
  const sortedTables = useMemo(() => [...tables].sort((a, b) => Number(a.id) - Number(b.id)), [tables]);
  const stats = useMemo(() => {
    const stagedSeats = staging.reduce((sum, item) => sum + item.guests.reduce((guestSum, guest) => guestSum + guest.count, 0), 0);
    const seats = tables.reduce((sum, table) => sum + tableCount(table), 0) + stagedSeats;
    const warnings = tables.filter((table) => ["short", "over"].includes(tableStatus(table))).length;
    return { seats, warnings, tables: tables.length };
  }, [tables, staging]);
  const matches = useMemo(() => {
    const key = query.trim();
    if (!key) return [];
    return sortedTables.flatMap((table) =>
      table.guests
        .filter((guest) => `${guest.name}${table.id}${tableGiftText(table)}${tableNoteText(table)}`.includes(key))
        .map((guest) => ({ ...guest, tableId: table.id }))
    );
  }, [query, sortedTables]);

  function persist(next) {
    setTables(next);
    localStorage.setItem("wedding-seating-v1", JSON.stringify(next));
    localStorage.setItem("wedding-seating-gift-model", GIFT_MODEL_VERSION);
  }

  function persistStaging(next) {
    setStaging(next);
    localStorage.setItem("wedding-seating-staging-v1", JSON.stringify(next));
  }

  function copyGuestFor(targetId, guest) {
    return { ...guest, id: `${targetId}-${guest.name}-${Date.now()}-${Math.random().toString(16).slice(2)}` };
  }

  function updateTableCapacity(tableId, capacity) {
    const nextCapacity = Math.max(1, Number(capacity) || 1);
    persist(tables.map((table) => (
      table.id === tableId ? { ...table, capacity: nextCapacity } : table
    )));
  }

  function updateTableGiftTotal(tableId, total) {
    const targetTotal = Math.max(0, Number(total) || 0);
    persist(tables.map((table) => {
      if (table.id !== tableId) return table;
      const giftCounts = distributeGiftCounts(table.guests.length, targetTotal);
      return {
        ...table,
        guests: table.guests.map((guest, index) => ({ ...guest, giftCount: giftCounts[index] ?? 0 })),
      };
    }));
  }

  function updateGuest(tableId, guestId, patch) {
    persist(tables.map((table) => {
      if (table.id !== tableId) return table;
      return {
        ...table,
        guests: table.guests.map((guest) => (
          guest.id === guestId
            ? {
              ...guest,
              ...patch,
              count: patch.count === undefined ? guest.count : Math.max(1, Number(patch.count) || 1),
              giftCount: patch.giftCount === undefined ? guest.giftCount : Math.max(0, Number(patch.giftCount) || 0),
            }
            : guest
        )),
      };
    }));
  }

  function addGuest(tableId) {
    persist(tables.map((table) => (
      table.id === tableId
        ? { ...table, guests: [...table.guests, { id: `${tableId}-新增宾客-${Date.now()}`, name: "新增宾客", count: 1, giftCount: 1 }] }
        : table
    )));
  }

  function deleteGuest(tableId, guestId) {
    persist(tables.map((table) => (
      table.id === tableId
        ? { ...table, guests: table.guests.filter((guest) => guest.id !== guestId) }
        : table
    )));
    setPickedGuestId(null);
  }

  function moveGuest(guestId, fromId, toId) {
    if (!guestId || fromId === toId) return;
    let moving;
    const next = tables.map((table) => {
      if (table.id !== fromId) return table;
      moving = table.guests.find((guest) => guest.id === guestId);
      return { ...table, guests: table.guests.filter((guest) => guest.id !== guestId) };
    }).map((table) => {
      if (table.id !== toId || !moving) return table;
      return { ...table, guests: [...table.guests, { ...moving, id: `${toId}-${moving.name}-${Date.now()}` }] };
    });
    persist(next);
    setSelectedId(toId);
    setPickedGuestId(null);
  }

  function moveGuestToStaging(guestId, fromId) {
    if (!guestId || !fromId) return;
    let moving;
    const nextTables = tables.map((table) => {
      if (table.id !== fromId) return table;
      moving = table.guests.find((guest) => guest.id === guestId);
      return { ...table, guests: table.guests.filter((guest) => guest.id !== guestId) };
    });
    if (!moving) return;
    persist(nextTables);
    persistStaging([
      ...staging,
      {
        id: `stage-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        label: `${moving.name} · 来自 ${fromId} 桌`,
        sourceTableId: fromId,
        guests: [{ ...moving, id: `stage-${moving.id}-${Date.now()}` }],
      },
    ]);
    setPickedGuestId(null);
  }

  function swapTableGuests(fromId, toId) {
    if (!fromId || !toId || fromId === toId) return;
    const a = tables.find((table) => table.id === fromId);
    const b = tables.find((table) => table.id === toId);
    if (!a || !b) return;
    persist(tables.map((table) => {
      if (table.id === fromId) return { ...table, guests: b.guests };
      if (table.id === toId) return { ...table, guests: a.guests };
      return table;
    }));
    setSelectedId(toId);
  }

  function swapTables() {
    swapTableGuests(selectedId, targetId);
  }

  function moveWholeTable() {
    if (!selectedId) return;
    if (selectedId === targetId) return;
    const source = tables.find((table) => table.id === selectedId);
    if (!source || !source.guests.length) return;
    const movedGuests = source.guests.map((guest) => ({ ...guest, id: `${targetId}-${guest.name}-${Date.now()}-${guest.id}` }));
    persist(tables.map((table) => {
      if (table.id === selectedId) return { ...table, guests: [] };
      if (table.id === targetId) return { ...table, guests: [...table.guests, ...movedGuests] };
      return table;
    }));
    setSelectedId(targetId);
    setPickedGuestId(null);
  }

  function moveTableToStaging(tableId) {
    const source = tables.find((table) => table.id === tableId);
    if (!source || !source.guests.length) return;
    persist(tables.map((table) => (table.id === tableId ? { ...table, guests: [] } : table)));
    persistStaging([
      ...staging,
      {
        id: `stage-${tableId}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        label: `${tableId} 号桌整桌暂存`,
        sourceTableId: tableId,
        guests: source.guests.map((guest) => ({ ...guest, id: `stage-${tableId}-${guest.id}-${Date.now()}` })),
      },
    ]);
    setSelectedId(tableId);
  }

  function moveStagedToTable(stagingId, toId) {
    const item = staging.find((entry) => entry.id === stagingId);
    if (!item) return;
    const guests = item.guests.map((guest) => copyGuestFor(toId, guest));
    persist(tables.map((table) => (
      table.id === toId ? { ...table, guests: [...table.guests, ...guests] } : table
    )));
    persistStaging(staging.filter((entry) => entry.id !== stagingId));
    setSelectedId(toId);
  }

  function clearStagedItem(stagingId) {
    persistStaging(staging.filter((entry) => entry.id !== stagingId));
  }

  function handleDropOnTable(data, toId) {
    if (data.type === "guest") moveGuest(data.guestId, data.fromId, toId);
    if (data.type === "table") swapTableGuests(data.tableId, toId);
    if (data.type === "staging") moveStagedToTable(data.stagingId, toId);
  }

  function handleDropOnStaging(data) {
    if (data.type === "guest") moveGuestToStaging(data.guestId, data.fromId);
    if (data.type === "table") moveTableToStaging(data.tableId);
  }

  function clearTable(id) {
    const backup = tables.find((table) => table.id === "66");
    if (!backup || id === "66") return;
    const source = tables.find((table) => table.id === id);
    persist(tables.map((table) => {
      if (table.id === id) return { ...table, guests: [] };
      if (table.id === "66") return { ...table, guests: [...table.guests, ...source.guests] };
      return table;
    }));
    setSelectedId("66");
  }

  function showCopied(message) {
    setCopyFeedback(message);
    window.setTimeout(() => setCopyFeedback(""), 1800);
  }

  async function copyTextExport() {
    try {
      await copyToClipboard({ plain: textSummary(sortedTables, staging, stats) });
      showCopied("文字已复制");
    } catch {
      showCopied("复制失败");
    }
  }

  async function copyTableExport() {
    const rows = tableRows(sortedTables, staging);
    const plain = rows.map((row) => row.join("\t")).join("\n");
    const html = `
      <table>
        <thead><tr>${rows[0].map((cell) => `<th>${escapeHtml(cell)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.slice(1).map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>`;
    try {
      await copyToClipboard({ plain, html });
      showCopied("表格已复制");
    } catch {
      showCopied("复制失败");
    }
  }

  function exportCsv() {
    const rows = tableRows(sortedTables, staging);
    const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
    downloadBlob(new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" }), "婚礼排桌名单.csv");
  }

  async function exportSeatingImage() {
    try {
      const blob = await seatingImageBlob(sortedTables, staging, stats);
      downloadBlob(blob, "婚礼席位图-带宾客.png");
      showCopied("排版图已下载");
    } catch {
      showCopied("图片导出失败");
    }
  }

  async function copySeatingImage() {
    try {
      const blob = await seatingImageBlob(sortedTables, staging, stats);
      await copyImageToClipboard(blob);
      showCopied("排版图已复制");
    } catch {
      showCopied("浏览器不支持复制图");
    }
  }

  function reset() {
    localStorage.removeItem("wedding-seating-v1");
    localStorage.removeItem("wedding-seating-staging-v1");
    localStorage.setItem("wedding-seating-gift-model", GIFT_MODEL_VERSION);
    setTables(normalizeTables(seedTables));
    setStaging([]);
    setSelectedId(null);
    setPickedGuestId(null);
  }

  return (
    <main className="app">
      <header className="topbar">
        <div>
          <h1>婚礼排桌助手</h1>
          <p>以手写黑色数字为桌号，保留附件中的桌位方位。</p>
        </div>
        <div className="toolbar">
          <div className="stat"><Users size={17} /> {stats.seats} 位</div>
          <div className="stat warn">{stats.warnings} 桌需确认</div>
          <button
            onClick={() => setShowGuests((current) => !current)}
            className={`ghost ${showGuests ? "active" : ""}`}
          >
            <ListTree size={16} /> {showGuests ? "隐藏每桌人" : "显示每桌人"}
          </button>
          <button onClick={reset} className="ghost"><RotateCcw size={16} /> 重置</button>
          <div className="exportGroup">
            <button className="ghost" onClick={copyTextExport}><Clipboard size={16} /> 复制文字</button>
            <button className="ghost" onClick={copyTableExport}><FileSpreadsheet size={16} /> 复制表格</button>
            <button className="ghost" onClick={copySeatingImage}><ImageDown size={16} /> 复制图</button>
            <button className="ghost" onClick={exportSeatingImage}><Download size={16} /> 下载图</button>
            <button onClick={exportCsv}><Download size={16} /> CSV</button>
          </div>
          {copyFeedback && <div className="copyToast"><Check size={15} /> {copyFeedback}</div>}
        </div>
      </header>

      <section className={`workspace ${selected ? "inspectorVisible" : ""}`}>
        <section className="mapPanel">
          <div className="mapTools">
            <div className="legend">
              <span><i className="dot ok" />正常</span>
              <span><i className="dot short" />缺人</span>
              <span><i className="dot over" />超员</span>
              <span><i className="dot backup" />备桌</span>
            </div>
            <label className="search">
              <Search size={17} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索宾客、桌号、备注" />
            </label>
          </div>
          <SearchResults query={query} matches={matches} onSelectTable={setSelectedId} compact />

          <div
            className={`hall ${showGuests ? "guestMode" : ""}`}
            aria-label="宴会厅平面图"
            onClick={(e) => {
              if (!e.target.closest?.(".tableNode")) setSelectedId(null);
            }}
          >
            <div className="stage">舞台</div>
            <div className="island">圆岛<br />舞台</div>
            <div className="aisle" />
            {sortedTables.map((table) => (
              <TableNode
                key={table.id}
                table={table}
                pos={positionById[table.id]}
                selected={table.id === selectedId}
                showGuests={showGuests}
                onSelect={() => setSelectedId(table.id)}
                onDropData={(data) => handleDropOnTable(data, table.id)}
              />
            ))}
          </div>
        </section>

        {selected && (
        <aside className="inspector">
          <div className="tableHeader">
            <div>
              <span>桌号</span>
              <strong>{selected.id}</strong>
            </div>
            <div className="tableHeaderActions">
              <StatusPill status={tableStatus(selected)} />
              <button className="closeInspector" onClick={() => setSelectedId(null)} aria-label="关闭工具栏">
                <X size={17} />
              </button>
            </div>
          </div>

          <div className="metrics">
            <Metric label="人数" value={`${tableCount(selected)} / ${selected.capacity}`}>
              <label className="capacityEdit">
                容量
                <input
                  type="number"
                  min="1"
                  value={selected.capacity}
                  onChange={(e) => updateTableCapacity(selected.id, e.target.value)}
                />
              </label>
            </Metric>
            <Metric label="礼份" value={tableGiftText(selected)} icon={<Gift size={16} />}>
              <label className="giftTotalEdit">
                总份
                <input
                  type="number"
                  min="0"
                  value={tableGiftCount(selected)}
                  onChange={(e) => updateTableGiftTotal(selected.id, e.target.value)}
                />
              </label>
              <span className="metricHint">可先改总份，再到每户细调；分开坐的一家可把其中一行设为 0</span>
            </Metric>
            <Metric label="备注" value={tableNoteText(selected) || "无"} />
          </div>

          <div className="moveBox">
            <select value={targetId} onChange={(e) => setTargetId(e.target.value)}>
              {sortedTables.map((table) => <option key={table.id} value={table.id}>{table.id} 号桌 · {tableCount(table)} 人</option>)}
            </select>
            <button className="soft" onClick={moveWholeTable} disabled={selectedId === targetId || !selected.guests.length}>
              移入目标桌
            </button>
            <button className="soft" onClick={swapTables}><ArrowLeftRight size={16} /> 整桌互换</button>
          </div>
          <p className="moveHint">单个宾客用下方行内下拉或拖拽移动；整桌移入会追加到目标桌，适合临时合并后再慢慢拆。</p>

          <StagingArea
            staging={staging}
            selectedId={selectedId}
            onDropData={handleDropOnStaging}
            onMoveToSelected={(stagingId) => moveStagedToTable(stagingId, selectedId)}
            onClear={clearStagedItem}
          />

          <GuestList
            table={selected}
            targetId={targetId}
            tables={sortedTables}
            pickedGuestId={pickedGuestId}
            setPickedGuestId={setPickedGuestId}
            moveGuest={moveGuest}
            clearTable={clearTable}
            updateGuest={updateGuest}
            addGuest={addGuest}
            deleteGuest={deleteGuest}
          />

          <SearchResults query={query} matches={matches} onSelectTable={setSelectedId} />
        </aside>
        )}
      </section>
    </main>
  );
}

function readDragData(event) {
  return {
    type: event.dataTransfer.getData("dragType"),
    guestId: event.dataTransfer.getData("guestId"),
    fromId: event.dataTransfer.getData("fromId"),
    tableId: event.dataTransfer.getData("tableId"),
    stagingId: event.dataTransfer.getData("stagingId"),
  };
}

function TableNode({ table, pos, selected, showGuests, onSelect, onDropData }) {
  const status = tableStatus(table);
  const count = tableCount(table);
  return (
    <button
      className={`tableNode ${status} ${selected ? "selected" : ""} ${showGuests ? "withGuests" : ""}`}
      data-table-id={table.id}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("dragType", "table");
        e.dataTransfer.setData("tableId", table.id);
      }}
      onClick={onSelect}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDropData(readDragData(e));
      }}
      title={`${table.id} 号桌，${count} 人`}
    >
      <em>{pos.sequence}</em>
      <strong>{table.id}</strong>
      <span className="seatCount">{count}/{table.capacity}</span>
      {tableGiftCount(table) > 0 && <small><Gift size={12} />{tableGiftCount(table)}</small>}
      {status === "over" && <b>超</b>}
      {status === "short" && <b>缺</b>}
      {showGuests && (
        <span className="tableGuests" aria-hidden="true">
          {table.guests.length
            ? table.guests.map((guest) => `${guest.name}${guest.count > 1 ? `(${guest.count})` : ""}`).join("、")
            : "空桌"}
        </span>
      )}
    </button>
  );
}

function StatusPill({ status }) {
  const labels = { ok: "正常", short: "缺人", over: "超员", backup: "备桌" };
  return <span className={`pill ${status}`}>{labels[status]}</span>;
}

function SearchResults({ query, matches, onSelectTable, compact = false }) {
  const hasQuery = query.trim();
  if (compact && !hasQuery) return null;
  return (
    <div className={`searchResults ${compact ? "compact" : ""}`}>
      {!compact && <h2>搜索结果</h2>}
      {hasQuery && matches.length > 0 && matches.map((guest) => (
        <button key={`${guest.tableId}-${guest.id}`} onClick={() => onSelectTable(guest.tableId)}>
          <span>{guest.name}{guest.count > 1 ? `（${guest.count}）` : ""}</span>
          <b>{guest.tableId} 号桌</b>
        </button>
      ))}
      {hasQuery && matches.length === 0 && <p>没有找到匹配的宾客或桌号。</p>}
      {!hasQuery && !compact && <p>输入姓名、桌号或备注后，可快速定位宾客。</p>}
    </div>
  );
}

function Metric({ label, value, icon, children }) {
  return <div className="metric"><span>{label}</span><strong>{icon}{value}</strong>{children}</div>;
}

function StagingArea({ staging, selectedId, onDropData, onMoveToSelected, onClear }) {
  const total = staging.reduce((sum, item) => sum + item.guests.reduce((guestSum, guest) => guestSum + guest.count, 0), 0);
  return (
    <section
      className={`stagingArea ${staging.length ? "hasItems" : ""}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onDropData(readDragData(e));
      }}
    >
      <div className="panelTitle">
        <h2>暂存区 <span>{total} 人</span></h2>
      </div>
      {staging.length ? (
        <div className="stagingItems">
          {staging.map((item) => (
            <div
              key={item.id}
              className="stagingItem"
              data-staging-id={item.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("dragType", "staging");
                e.dataTransfer.setData("stagingId", item.id);
              }}
            >
              <GripVertical size={16} />
              <div>
                <strong>{item.label}</strong>
                <span>
                  {item.guests.map((guest) => `${guest.name}${guest.count > 1 ? `(${guest.count})` : ""}`).join("、")}
                </span>
              </div>
              <button type="button" onClick={() => onMoveToSelected(item.id)}>放入 {selectedId}</button>
              <button type="button" className="iconOnly" onClick={() => onClear(item.id)} aria-label="移除暂存项">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>把整桌或单个宾客拖到这里，先空出来再慢慢调整。</p>
      )}
    </section>
  );
}

function GuestList({
  table,
  targetId,
  tables,
  pickedGuestId,
  setPickedGuestId,
  moveGuest,
  clearTable,
  updateGuest,
  addGuest,
  deleteGuest,
}) {
  return (
    <section className="guestPanel">
      <div className="panelTitle">
        <h2>宾客名单</h2>
        <div className="panelActions">
          <button className="softMini" onClick={() => addGuest(table.id)}>添加宾客</button>
          <button className="danger" onClick={() => clearTable(table.id)} disabled={table.id === "66" || !table.guests.length}>
            <Trash2 size={15} /> 清空至备桌
          </button>
        </div>
      </div>
      <div className="guestRows">
        {table.guests.length ? table.guests.map((guest, index) => (
          <div
            key={guest.id}
            className={`guestRow ${pickedGuestId === guest.id ? "picked" : ""}`}
            onClick={() => setPickedGuestId(guest.id)}
          >
            <span
              className="num"
              draggable
              title="拖动序号移动宾客"
              onDragStart={(e) => {
                e.dataTransfer.setData("dragType", "guest");
                e.dataTransfer.setData("guestId", guest.id);
                e.dataTransfer.setData("fromId", table.id);
              }}
            >
              {index + 1}
            </span>
            <input
              className="guestNameInput"
              value={guest.name}
              onChange={(e) => updateGuest(table.id, guest.id, { name: e.target.value })}
              onClick={(e) => e.stopPropagation()}
            />
            <label className="guestCountInput">
              <input
                type="number"
                min="1"
                value={guest.count}
                onChange={(e) => updateGuest(table.id, guest.id, { count: e.target.value })}
                onClick={(e) => e.stopPropagation()}
              />
              人
            </label>
            <label className="giftCountInput">
              <input
                type="number"
                min="0"
                value={guest.giftCount ?? 0}
                onChange={(e) => updateGuest(table.id, guest.id, { giftCount: e.target.value })}
                onClick={(e) => e.stopPropagation()}
              />
              份
            </label>
            <select value={targetId} onClick={(e) => e.stopPropagation()} onChange={(e) => moveGuest(guest.id, table.id, e.target.value)}>
              {tables.filter((item) => item.id !== table.id).map((item) => <option key={item.id} value={item.id}>移到 {item.id}</option>)}
            </select>
            <button className="rowDelete" onClick={(e) => {
              e.stopPropagation();
              deleteGuest(table.id, guest.id);
            }} aria-label={`删除 ${guest.name}`}>
              <Trash2 size={14} />
            </button>
          </div>
        )) : <div className="empty">这桌暂时没有宾客，可从其他桌拖拽过来。</div>}
      </div>
      <p className="hint">可拖动宾客行到左侧任意桌，也可用每行右侧下拉框直接移桌。</p>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
