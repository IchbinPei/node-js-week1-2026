const fs = require('fs/promises');

// ========== 任務一：讀取會員清單 ==========
/**
 * 讀取指定路徑的 JSON 檔案，回傳解析後的會員陣列。
 *
 * @param {string} filePath - 會員 JSON 檔案的路徑（相對或絕對都可以）
 * @returns {Promise<Array<Object>>} 會員物件陣列
 *
 * @example
 *   const members = await readMembers('./fixtures/members.json');
 *   console.log(members[0].name); // '小華'
 */
async function readMembers(filePath) {
  // TODO: 實作此函式
  try {
    const text = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(text);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('檔案不存在，回傳空陣列');
      return [];
    }
    throw error;  // 其他錯誤繼續往上丟
  }
  // 提示：用 fs/promises 的 readFile，記得加 'utf-8'，再用 JSON.parse 轉成物件
}

// ========== 任務二：篩選 VIP 會員 ==========
/**
 * 從會員陣列中篩選出 level 為 "VIP" 的會員。
 *
 * @param {Array<Object>} members - 會員陣列
 * @returns {Array<Object>} 只包含 VIP 會員的新陣列
 *
 * @example
 *   filterVIP([
 *     { name: '小華', level: 'VIP' },
 *     { name: '小美', level: 'normal' }
 *   ]); // [{ name: '小華', level: 'VIP' }]
 */
function filterVIP(members) {
  // TODO: 實作此函式
  return members.filter(member => member.level === 'VIP');
  // 提示：用 Array.prototype.filter，不要修改原陣列
}

// ========== 任務三：計算會員剩餘點數總和 ==========
/**
 * 加總會員陣列中所有人的 credits 欄位。
 *
 * @param {Array<{credits: number}>} members - 會員陣列
 * @returns {number} credits 總和，空陣列回傳 0
 *
 * @example
 *   sumCredits([{ credits: 120 }, { credits: 30 }]); // 150
 *   sumCredits([]);                                  // 0
 */
function sumCredits(members) {
  // TODO: 實作此函式
  // 提示：用 reduce，初始值給 0
  const sumCredit = members.reduce((total, member) => {
    return total + member.credits;
  }, 0);

  return sumCredit;
}

// ========== 任務四：讀取環境變數 ==========
/**
 * 從 process.env 讀取健身房設定，組成設定物件。
 *
 * 規則：
 *   - GYM_NAME 未設定 → 預設 '未命名健身房'
 *   - ADMIN_NAME 未設定 → 預設 '尚未指派'
 *   - DEFAULT_MEMBERS_PATH → 原樣回傳（沒有預設值）
 *
 * @returns {{gymName: string, adminName: string, defaultMembersPath: string | undefined}}
 *
 * @example
 *   process.env.GYM_NAME = 'FitClub';
 *   process.env.ADMIN_NAME = 'Leo';
 *   getGymConfig();
 *   // { gymName: 'FitClub', adminName: 'Leo', defaultMembersPath: undefined }
 */
function getGymConfig() {
  // TODO: 實作此函式
  // 提示：用 || 給預設值
  return {
    gymName: process.env.GYM_NAME || '未命名健身房',
    adminName: process.env.ADMIN_NAME || '尚未指派',
    defaultMembersPath: process.env.DEFAULT_MEMBERS_PATH
  };
}

// ========== 任務五：VIP 會員統計摘要（綜合題）==========
/**
 * 讀取會員檔案、篩出 VIP、回傳統計摘要。
 *
 * 可以（也建議）呼叫前面寫好的 readMembers / filterVIP / sumCredits。
 *
 * @param {string} filePath - 會員 JSON 檔案的路徑
 * @returns {Promise<{count: number, totalCredits: number, names: string[]}>}
 *
 * @example
 *   await getVIPSummary('./fixtures/members.json');
 *   // { count: 2, totalCredits: 320, names: ['小華', '阿強'] }
 */
async function getVIPSummary(filePath) {
  // TODO: 實作此函式
  // 步驟：
  //   1. 讀會員資料
  const members = await readMembers(filePath);
  //   2. 篩出 VIP
  const vipMembers = filterVIP(members);
  //   3. 算總點數、收集姓名
  const totalCredits = sumCredits(vipMembers);
  const names = vipMembers.map(member => member.name);
  //   4. 回傳 { count, totalCredits, names }
  return {
    count: vipMembers.length,
    totalCredits,
    names
  };
}

module.exports = {
  readMembers,
  filterVIP,
  sumCredits,
  getGymConfig,
  getVIPSummary,
};
