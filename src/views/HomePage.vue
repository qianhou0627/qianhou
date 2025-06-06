<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import gsap from 'gsap'

// 颜色配置
const colors = [
  { main: '#FBDB4A', shades: ['#FAE073', '#FCE790', '#FADD65', '#E4C650'] },
  { main: '#F3934A', shades: ['#F7B989', '#F9CDAA', '#DD8644', '#F39C59'] },
  { main: '#EB547D', shades: ['#EE7293', '#F191AB', '#D64D72', '#C04567'] },
  { main: '#9F6AA7', shades: ['#B084B6', '#C19FC7', '#916198', '#82588A'] },
  { main: '#5476B3', shades: ['#6382B9', '#829BC7', '#4D6CA3', '#3E5782'] },
  { main: '#2BB19B', shades: ['#4DBFAD', '#73CDBF', '#27A18D', '#1F8171'] },
  { main: '#70B984', shades: ['#7FBE90', '#98CBA6', '#68A87A', '#5E976E'] },
]

// 响应式状态
interface Letter {
  offScreen: HTMLElement
  onScreen: HTMLElement
  char: string
  shift?: boolean
}

const letters = ref<Letter[]>([])
const width = ref(0)
const height = ref(0)
const textSize = ref(0)
const textCenter = ref(0)
const placeholderText = ref('请搜索软件名称...')
const searchQuery = ref('') // 搜索查询

// 双层导航状态
const activeCategory = ref('❤️ 主播真心推荐')
const activeSubcategory = ref('')

// 模拟商品数据
const products = ref([
  // ❤️ 主播真心推荐
  { id: 1, name: 'Clash VPN', category: '日常软件', subcategory: '日常软件' },
  { id: 2, name: 'DeepSeek 本地版', category: '日常软件', subcategory: '日常软件' },
  { id: 3, name: '7-zip 免费解压', category: '日常软件', subcategory: '日常软件' },
  { id: 4, name: 'Geek 软件卸载', category: '日常软件', subcategory: '日常软件' },
  { id: 5, name: 'Chrome 谷歌浏览器', category: '日常软件', subcategory: '日常软件' },
  { id: 6, name: '微信输入法', category: '日常软件', subcategory: '日常软件' },
  { id: 7, name: '火绒安全', category: '日常软件', subcategory: '日常软件' },
  { id: 8, name: 'PixPin 截图+贴图', category: '日常软件', subcategory: '日常软件' },
  { id: 9, name: 'Everything 找文件', category: '日常软件', subcategory: '日常软件' },
  { id: 10, name: '巨应壁纸', category: '日常软件', subcategory: '日常软件' },
  { id: 11, name: 'Steam', category: '日常软件', subcategory: '日常软件' },
  { id: 12, name: '百度网盘', category: '日常软件', subcategory: '日常软件' },

  // 📚 通用学术工具
  { id: 13, name: 'Office', category: '文档办公', subcategory: '文档办公' },
  { id: 14, name: 'Typora', category: '文档办公', subcategory: '文档办公' },
  { id: 15, name: 'Xmind', category: '文档办公', subcategory: '文档办公' },
  { id: 16, name: 'Project', category: '文档办公', subcategory: '文档办公' },
  { id: 17, name: 'Visio', category: '文档办公', subcategory: '文档办公' },
  { id: 18, name: 'Sketchpad', category: '文档办公', subcategory: '文档办公' },

  { id: 19, name: 'EndNote', category: '文献管理', subcategory: '文献管理' },
  { id: 20, name: 'Zotero', category: '文献管理', subcategory: '文献管理' },
  { id: 21, name: 'CAJViewer', category: '文献管理', subcategory: '文献管理' },
  { id: 22, name: 'NoteExpress', category: '文献管理', subcategory: '文献管理' },
  { id: 23, name: 'Mendeley', category: '文献管理', subcategory: '文献管理' },
  { id: 24, name: '论文潜搜', category: '文献管理', subcategory: '文献管理' },

  { id: 25, name: 'DeepL Pro', category: '翻译工具', subcategory: '翻译工具' },
  { id: 26, name: '知云文献翻译', category: '翻译工具', subcategory: '翻译工具' },
  { id: 27, name: 'CopyTranslator', category: '翻译工具', subcategory: '翻译工具' },
  { id: 28, name: 'pot', category: '翻译工具', subcategory: '翻译工具' },
  { id: 29, name: 'TransSmart', category: '翻译工具', subcategory: '翻译工具' },
  { id: 30, name: 'STranslate', category: '翻译工具', subcategory: '翻译工具' },

  { id: 31, name: 'Acrobat DC', category: '文件工具', subcategory: '文件工具' },
  { id: 32, name: 'PDFelement', category: '文件工具', subcategory: '文件工具' },
  { id: 33, name: 'UPDF', category: '文件工具', subcategory: '文件工具' },
  { id: 34, name: '压缩解压', category: '文件工具', subcategory: '文件工具' },
  { id: 35, name: '格式工厂', category: '文件工具', subcategory: '文件工具' },

  // 💻 计算机学院系
  { id: 42, name: 'Python', category: '开发编程', subcategory: '开发编程' },
  { id: 43, name: 'Java', category: '开发编程', subcategory: '开发编程' },
  { id: 44, name: 'R语言', category: '开发编程', subcategory: '开发编程' },
  { id: 45, name: 'C C# C++', category: '开发编程', subcategory: '开发编程' },
  { id: 46, name: 'PyCharm', category: '开发编程', subcategory: '开发编程' },
  { id: 47, name: 'IDEA', category: '开发编程', subcategory: '开发编程' },
  { id: 48, name: 'VS Code', category: '开发编程', subcategory: '开发编程' },
  { id: 49, name: 'Anaconda', category: '开发编程', subcategory: '开发编程' },
  { id: 36, name: 'VMware', category: '开发编程', subcategory: '开发编程' },

  { id: 50, name: 'MySQL', category: '数据库工具', subcategory: '数据库工具' },
  { id: 51, name: 'SQL Server', category: '数据库工具', subcategory: '数据库工具' },
  { id: 52, name: 'Navicat Premium', category: '数据库工具', subcategory: '数据库工具' },
  { id: 53, name: 'DBeaver', category: '数据库工具', subcategory: '数据库工具' },

  { id: 54, name: 'DeepSeek', category: 'AI开发', subcategory: 'AI开发' },
  { id: 55, name: 'Stable Diffusion', category: 'AI开发', subcategory: 'AI开发' },
  { id: 56, name: 'Kimi AI', category: 'AI开发', subcategory: 'AI开发' },
  { id: 57, name: '讯飞星火', category: 'AI开发', subcategory: 'AI开发' },
  { id: 58, name: 'OfficeAI', category: 'AI开发', subcategory: 'AI开发' },

  { id: 59, name: 'LabVIEW', category: '系统工程', subcategory: '系统工程' },
  { id: 60, name: 'Keil', category: '系统工程', subcategory: '系统工程' },
  { id: 61, name: 'Quartus II', category: '系统工程', subcategory: '系统工程' },
  { id: 62, name: 'Step7', category: '系统工程', subcategory: '系统工程' },
  { id: 63, name: 'PowerMill', category: '系统工程', subcategory: '系统工程' },

  // 🎨 设计与艺术学院
  { id: 64, name: 'PS', category: '图像处理', subcategory: '图像处理' },
  { id: 65, name: 'Illustrator', category: '图像处理', subcategory: '图像处理' },
  { id: 66, name: 'Clip Studio Paint', category: '图像处理', subcategory: '图像处理' },
  { id: 67, name: 'Corel Painter', category: '图像处理', subcategory: '图像处理' },
  { id: 68, name: 'Krita', category: '图像处理', subcategory: '图像处理' },

  { id: 69, name: 'PR', category: '媒体制作', subcategory: '媒体制作' },
  { id: 70, name: 'AE', category: '媒体制作', subcategory: '媒体制作' },
  { id: 71, name: '剪映', category: '媒体制作', subcategory: '媒体制作' },
  { id: 72, name: 'Audition', category: '媒体制作', subcategory: '媒体制作' },
  { id: 73, name: 'DaVinci', category: '媒体制作', subcategory: '媒体制作' },
  { id: 74, name: 'Maya', category: '媒体制作', subcategory: '媒体制作' },

  { id: 75, name: 'Blender', category: '3D创作', subcategory: '3D创作' },
  { id: 76, name: 'C4D', category: '3D创作', subcategory: '3D创作' },
  { id: 77, name: 'ZBrush', category: '3D创作', subcategory: '3D创作' },
  { id: 78, name: 'Marvelous Designer', category: '3D创作', subcategory: '3D创作' },
  { id: 79, name: 'Marmoset', category: '3D创作', subcategory: '3D创作' },

  { id: 80, name: 'Adobe XD', category: '设计工具', subcategory: '设计工具' },
  { id: 81, name: 'Axure', category: '设计工具', subcategory: '设计工具' },
  { id: 82, name: 'SketchBook', category: '设计工具', subcategory: '设计工具' },
  { id: 83, name: 'jewelCAD', category: '设计工具', subcategory: '设计工具' },

  // 🏗️ 建筑与规划学院
  { id: 84, name: 'Revit', category: 'BIM设计', subcategory: 'BIM设计' },
  { id: 85, name: 'ArchiCAD', category: 'BIM设计', subcategory: 'BIM设计' },
  { id: 86, name: 'Vectorworks', category: 'BIM设计', subcategory: 'BIM设计' },
  { id: 87, name: 'Tekla', category: 'BIM设计', subcategory: 'BIM设计' },
  { id: 88, name: 'Navisworks', category: 'BIM设计', subcategory: 'BIM设计' },

  { id: 89, name: 'CAD', category: '建筑CAD', subcategory: '建筑CAD' },
  { id: 90, name: '天正软件', category: '建筑CAD', subcategory: '建筑CAD' },
  { id: 91, name: '浩辰CAD', category: '建筑CAD', subcategory: '建筑CAD' },

  { id: 93, name: 'Lumion', category: '可视化工具', subcategory: '可视化工具' },
  { id: 94, name: 'Enscape', category: '可视化工具', subcategory: '可视化工具' },
  { id: 95, name: 'V-Ray', category: '可视化工具', subcategory: '可视化工具' },
  { id: 96, name: 'Fuzor', category: '可视化工具', subcategory: '可视化工具' },
  { id: 97, name: 'Artlantis', category: '可视化工具', subcategory: '可视化工具' },

  { id: 98, name: 'ArcGIS', category: '规划分析', subcategory: '规划分析' },
  { id: 100, name: 'SketchUp SU', category: '规划分析', subcategory: '规划分析' },

  // ⚙️ 机械制造学院
  { id: 101, name: 'SolidWorks', category: '机械设计', subcategory: '机械设计' },
  { id: 102, name: 'UG NX', category: '机械设计', subcategory: '机械设计' },
  { id: 103, name: 'Inventor', category: '机械设计', subcategory: '机械设计' },
  { id: 104, name: 'CATIA', category: '机械设计', subcategory: '机械设计' },
  { id: 105, name: 'Creo', category: '机械设计', subcategory: '机械设计' },

  { id: 106, name: 'Mastercam', category: 'CAM加工', subcategory: 'CAM加工' },
  { id: 107, name: 'hyperMILL', category: 'CAM加工', subcategory: 'CAM加工' },
  { id: 108, name: 'CIMCO Edit', category: 'CAM加工', subcategory: 'CAM加工' },
  { id: 109, name: 'VERICUT', category: 'CAM加工', subcategory: 'CAM加工' },

  { id: 110, name: 'KeyShot', category: '产品渲染', subcategory: '产品渲染' },
  { id: 111, name: 'Vred', category: '产品渲染', subcategory: '产品渲染' },
  { id: 112, name: 'Modo', category: '产品渲染', subcategory: '产品渲染' },

  { id: 113, name: 'Solid Edge', category: '工业软件', subcategory: '工业软件' },
  { id: 114, name: 'ABB RobotStudio', category: '工业软件', subcategory: '工业软件' },
  { id: 115, name: '组态王', category: '工业软件', subcategory: '工业软件' },

  // 🧪 材料化工学院
  { id: 116, name: 'Materials Studio', category: '材料计算', subcategory: '材料计算' },
  { id: 117, name: 'JMatPro', category: '材料计算', subcategory: '材料计算' },
  { id: 118, name: 'Solid Converter PDF', category: '材料计算', subcategory: '材料计算' },

  { id: 119, name: 'ChemDraw', category: '化学工具', subcategory: '化学工具' },
  { id: 120, name: 'Dynaform', category: '化学工具', subcategory: '化学工具' },
  { id: 121, name: 'Moldflow', category: '化学工具', subcategory: '化学工具' },

  { id: 122, name: 'COMSOL', category: '工艺仿真', subcategory: '工艺仿真' },
  { id: 123, name: 'Tecplot', category: '工艺仿真', subcategory: '工艺仿真' },
  { id: 124, name: 'Ansys Lumerical', category: '工艺仿真', subcategory: '工艺仿真' },

  // ⚡ 电子电气学院
  { id: 125, name: 'Altium Designer', category: '电路设计', subcategory: '电路设计' },
  { id: 126, name: 'Cadence', category: '电路设计', subcategory: '电路设计' },
  { id: 127, name: 'Proteus', category: '电路设计', subcategory: '电路设计' },
  { id: 128, name: 'Epaln', category: '电路设计', subcategory: '电路设计' },

  { id: 129, name: 'Multisim', category: '信号仿真', subcategory: '信号仿真' },
  { id: 130, name: 'PSIM', category: '信号仿真', subcategory: '信号仿真' },
  { id: 131, name: 'TIA Portal', category: '信号仿真', subcategory: '信号仿真' },
  { id: 132, name: 'GX Works', category: '信号仿真', subcategory: '信号仿真' },

  { id: 133, name: 'WinCC', category: '控制系统', subcategory: '控制系统' },
  { id: 134, name: 'SimLab', category: '控制系统', subcategory: '控制系统' },
  { id: 135, name: 'MotorSolve', category: '控制系统', subcategory: '控制系统' },

  // 🌐 地理测绘学院
  { id: 136, name: 'ENVI', category: '遥感分析', subcategory: '遥感分析' },
  { id: 137, name: 'PCI Geomatica', category: '遥感分析', subcategory: '遥感分析' },
  { id: 138, name: 'Global Mapper', category: '遥感分析', subcategory: '遥感分析' },

  { id: 139, name: 'ArcGIS', category: 'GIS开发', subcategory: 'GIS开发' },
  { id: 140, name: 'SuperMap', category: 'GIS开发', subcategory: 'GIS开发' },
  { id: 141, name: 'QGIS', category: 'GIS开发', subcategory: 'GIS开发' },

  { id: 142, name: 'Google Earth', category: '测量工具', subcategory: '测量工具' },
  { id: 143, name: 'Civil 3D', category: '测量工具', subcategory: '测量工具' },
  { id: 144, name: 'midas Civil', category: '测量工具', subcategory: '测量工具' },

  // 📈 经济管理学院
  { id: 145, name: 'SPSS', category: '统计分析', subcategory: '统计分析' },
  { id: 146, name: 'SAS', category: '统计分析', subcategory: '统计分析' },
  { id: 147, name: 'EViews', category: '统计分析', subcategory: '统计分析' },
  { id: 148, name: 'Origin', category: '统计分析', subcategory: '统计分析' },
  { id: 149, name: 'Minitab', category: '统计分析', subcategory: '统计分析' },

  { id: 150, name: 'Tableau', category: '商务智能', subcategory: '商务智能' },
  { id: 151, name: 'PowerBI', category: '商务智能', subcategory: '商务智能' },
  { id: 152, name: 'Design Exper', category: '商务智能', subcategory: '商务智能' },

  { id: 153, name: 'Stata', category: '计量经济', subcategory: '计量经济' },
  { id: 154, name: 'Mplus', category: '计量经济', subcategory: '计量经济' },
  { id: 155, name: 'NCSS', category: '计量经济', subcategory: '计量经济' },

  // 🧬 生物医学学院
  { id: 156, name: 'Oligo', category: '生物分析', subcategory: '生物分析' },
  { id: 157, name: 'Cytoscape', category: '生物分析', subcategory: '生物分析' },
  { id: 158, name: 'Meshmixer', category: '生物分析', subcategory: '生物分析' },

  { id: 159, name: 'Materialise Mimic', category: '医学影像', subcategory: '医学影像' },
  { id: 161, name: 'DxO', category: '医学影像', subcategory: '医学影像' },

  { id: 162, name: 'Prism', category: '实验工具', subcategory: '实验工具' },
  { id: 163, name: 'AxMath', category: '实验工具', subcategory: '实验工具' },
  { id: 164, name: 'PASS', category: '实验工具', subcategory: '实验工具' },

  // 🔭 物理光电学院
  { id: 165, name: 'Zemax OpticStudio', category: '光学设计', subcategory: '光学设计' },
  { id: 166, name: 'Lightroom', category: '光学设计', subcategory: '光学设计' },
  { id: 167, name: 'FredOptics', category: '光学设计', subcategory: '光学设计' },

  { id: 168, name: 'COMSOL', category: '物理仿真', subcategory: '物理仿真' },
  { id: 169, name: 'ANSYS Electronics', category: '物理仿真', subcategory: '物理仿真' },

  { id: 171, name: 'Origin', category: '数据处理', subcategory: '数据处理' },
  { id: 172, name: 'SigmaPlot', category: '数据处理', subcategory: '数据处理' },
  { id: 173, name: 'FX Draw Tools', category: '数据处理', subcategory: '数据处理' },

  // 🌿 环境土木学院
  { id: 174, name: 'Ansys', category: '结构分析', subcategory: '结构分析' },
  { id: 175, name: 'midas Gen', category: '结构分析', subcategory: '结构分析' },
  { id: 176, name: 'PLAXIS', category: '结构分析', subcategory: '结构分析' },
  { id: 177, name: 'FLAC3D', category: '结构分析', subcategory: '结构分析' },

  { id: 178, name: 'GeoStudio', category: '岩土工具', subcategory: '岩土工具' },
  { id: 179, name: 'CivilFEM', category: '岩土工具', subcategory: '岩土工具' },
  { id: 180, name: 'Plaxis', category: '岩土工具', subcategory: '岩土工具' },

  { id: 182, name: 'EPANET', category: '水处理模拟', subcategory: '水处理模拟' },
  { id: 183, name: 'Tecplot', category: '水处理模拟', subcategory: '水处理模拟' },

  // 📐 数学科学学院
  { id: 184, name: 'MATLAB', category: '科学计算', subcategory: '科学计算' },
  { id: 185, name: 'Mathematica', category: '科学计算', subcategory: '科学计算' },
  { id: 186, name: 'Maple', category: '科学计算', subcategory: '科学计算' },
  { id: 187, name: 'MathCAD', category: '科学计算', subcategory: '科学计算' },

  { id: 188, name: 'MathType', category: '公式工具', subcategory: '公式工具' },
  { id: 189, name: 'AxMath', category: '公式工具', subcategory: '公式工具' },
  { id: 190, name: 'LaTeX', category: '公式工具', subcategory: '公式工具' },

  { id: 191, name: 'LINGO', category: '算法建模', subcategory: '算法建模' },
  { id: 192, name: 'IBM CPLEX', category: '算法建模', subcategory: '算法建模' },
  { id: 193, name: 'Gurobi', category: '算法建模', subcategory: '算法建模' },
])

// 过滤显示的商品
const filteredProducts = computed(() => {
  // 如果有搜索查询，优先显示搜索结果
  if (searchQuery.value.trim()) {
    return searchedProducts.value
  }

  // 筛选出当前分类和子分类的商品
  let filtered = products.value

  // 如果是主页的一级分类筛选
  if (activeCategory.value && activeCategory.value.includes('学院')) {
    filtered = products.value.filter((product) => {
      return product.subcategory && subcategories.value.includes(product.subcategory)
    })
  }

  // 如果选择了子分类，则按子分类筛选
  if (activeSubcategory.value) {
    filtered = filtered.filter((product) => product.subcategory === activeSubcategory.value)
  }

  return filtered
})

// 搜索结果
const searchedProducts = computed(() => {
  if (!searchQuery.value.trim()) return []

  const query = searchQuery.value.trim().toLowerCase()
  return products.value.filter((product) => {
    // 对软件名称进行模糊匹配（不区分大小写）
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.subcategory.toLowerCase().includes(query)
    )
  })
})

// 获取当前分类的所有商品，不限子分类
const categoryProducts = computed(() => {
  // 如果是主页的一级分类筛选
  if (activeCategory.value && activeCategory.value.includes('学院')) {
    return products.value.filter((product) => {
      return product.subcategory && subcategories.value.includes(product.subcategory)
    })
  }

  // 如果是主播推荐等特殊分类，则按当前分类筛选
  return products.value.filter((product) => {
    const currentSubcategories =
      subcategoryMap[activeCategory.value as keyof typeof subcategoryMap] || []
    return currentSubcategories.includes(product.subcategory)
  })
})

// 切换分类
const switchCategory = (category: string) => {
  activeCategory.value = category
  // 重置二级导航选中项
  activeSubcategory.value = subcategories.value[0] || ''
}

// 切换子分类
const switchSubcategory = (subcategory: string) => {
  activeSubcategory.value = subcategory
}

// 学院分类列表
const categories = [
  '❤️ 主播真心推荐',
  '📚 通用学术工具',
  '💻 计算机学院系',
  '🎨 设计艺术学院',
  '🏗️ 建筑规划学院',
  '⚙️ 机械制造学院',
  '🧪 材料化工学院',
  '⚡ 电子电气学院',
  '🌐 地理测绘学院',
  '📈 经济管理学院',
  '🧬 生物医学学院',
  '🔭 物理光电学院',
  '🌿 环境土木学院',
  '📐 数学科学学院',
]

// 子分类映射
const subcategoryMap = {
  '❤️ 主播真心推荐': ['日常软件'],
  '📚 通用学术工具': ['文档办公', '文献管理', '翻译工具', '文件工具'],
  '💻 计算机学院系': ['开发编程', '数据库工具', '系统工程'],
  '🎨 设计艺术学院': ['图像处理', '媒体制作', '3D创作', '设计工具'],
  '🏗️ 建筑规划学院': ['BIM设计', '建筑CAD', '可视化工具', '规划分析'],
  '⚙️ 机械制造学院': ['机械设计', 'CAM加工', '产品渲染', '工业软件'],
  '🧪 材料化工学院': ['材料计算', '化学工具', '工艺仿真'],
  '⚡ 电子电气学院': ['电路设计', '信号仿真', '控制系统'],
  '🌐 地理测绘学院': ['遥感分析', 'GIS开发', '测量工具'],
  '📈 经济管理学院': ['统计分析', '商务智能', '计量经济'],
  '🧬 生物医学学院': ['生物分析', '医学影像', '实验工具'],
  '🔭 物理光电学院': ['光学设计', '物理仿真', '数据处理'],
  '🌿 环境土木学院': ['结构分析', '岩土工具', '水处理模拟'],
  '📐 数学科学学院': ['科学计算', '公式工具', '算法建模'],
}

// 计算当前选中分类的子分类
const subcategories = computed(() => {
  return subcategoryMap[activeCategory.value as keyof typeof subcategoryMap] || []
})

// 获取产品描述
const getProductDescription = (productName: string): string => {
  const descriptions: Record<string, string> = {
    //日常软件
    'Clash VPN': '访问一些无法打开的网址！！！查论文，GPT,没它国外网站进不去',
    '7-zip 免费解压': '免费的解压压缩软件，没有任何广告',
    'DeepSeek 本地版': '最大的优点就是，不会繁忙了，支持R1 V3',
    'Geek 软件卸载': '软件不会卸载，卸载不干净，就有它，免费，能满足基础的卸载需求',
    火绒安全: '一款干净无广告，无弹窗，无收费的国产杀毒软件，不喜欢广告满天飞的可以试试这个',
    'PixPin 截图+贴图': '最强截图软件snipaste的平替，但我觉得更强，支持长截图很nice，重点是免费',
    微信输入法: '简约美观，最重要的是手机电脑剪切板同步，一键同步消息',
    'Chrome 谷歌浏览器': '浏览器天花板，没有之一，但进阶使用有些许门槛，需要搭配Clash机场',
    'Everything 找文件':
      '能以最快的速度找到在电脑上的任何文件，比自带的搜索好千万倍，超快速度，经常查不到文件在哪的可以安装一个',
    巨应壁纸:
      '主打免费无广告，wallpaper的平替，不差钱建议还是steam买wallpaper，壁纸天花板，没有之一的存在',
    Steam: '不介绍了，都知道是啥，怕有人找不到官网，贴出来，防止大家入坑',

    百度网盘: '不仅仅是网盘，更是资料的天堂，考研考公',

    // 文档办公
    Office: '微软办公套件，包含Word、Excel、PowerPoint等，是日常办公必备工具。',
    Typora: '简洁高效的Markdown编辑器，支持即时渲染，让写作更专注。',
    Xmind: '专业思维导图工具，帮助组织思路、规划项目和创意发散。',
    Project: '微软专业项目管理软件，用于项目规划、资源分配和进度跟踪。',
    Visio: '专业流程图和图表制作工具，可视化复杂信息和系统。',
    Sketchpad: '数字绘图板应用，支持手绘笔记和创意草图设计。',

    // 文献管理
    EndNote: '专业文献管理工具，支持参考文献收集、组织和引用格式化。',
    Zotero: '免费开源文献管理软件，可从网页一键抓取文献信息。',
    CAJViewer: '中文文献阅读工具，支持CAJ、PDF等格式，适合阅读中文期刊。',
    NoteExpress: '国产文献管理软件，与中文数据库兼容性好。',
    Mendeley: '免费文献管理工具，支持PDF注释和社交学术网络。',
    论文潜搜: '专注学术搜索的工具，帮助快速定位和获取研究资料。',

    // 翻译工具
    'DeepL Pro': '基于神经网络的高质量翻译工具，翻译准确度高。',
    知云文献翻译: '专为学术文献设计的翻译工具，支持PDF全文翻译。',
    CopyTranslator: '复制即翻译的工具，适合阅读外文文献。',
    pot: '开源翻译软件，支持划词翻译和OCR识别。',
    TransSmart: '智能翻译工具，支持多语言实时翻译。',
    STranslate: '轻量级翻译工具，支持多引擎和快捷键操作。',

    // 文件工具
    'Acrobat DC': 'Adobe专业PDF编辑器，支持创建、编辑和转换PDF文件。',
    PDFelement: '全能PDF编辑工具，价格实惠，功能丰富。',
    UPDF: '现代化PDF编辑器，界面简洁，操作流畅。',
    压缩解压: '文件压缩解压工具，支持多种压缩格式。',
    格式工厂: '多媒体格式转换工具，支持几乎所有音视频格式转换。',

    // 开发编程
    Python: '流行的编程语言，简洁易学，应用广泛。',
    Java: '跨平台编程语言，广泛用于企业级应用开发。',
    R语言: '统计计算和图形化的编程语言，数据分析利器。',
    'C C# C++': '微软开发的面向对象编程语言，用于.NET平台开发。',
    PyCharm: 'Python集成开发环境，提供代码分析和调试工具。',
    IDEA: 'Java开发的智能集成环境，代码补全和重构功能强大。',
    'VS Code': '轻量级代码编辑器，支持多种编程语言和扩展。',
    Anaconda: 'Python和R语言的发行版，预装了数据科学相关的包和库。',
    VMware: '专业虚拟机软件，可在一台电脑上运行多个操作系统。',

    // 数据库工具
    MySQL: '开源关系型数据库管理系统，广泛应用于Web应用。',
    'SQL Server': '微软的关系型数据库产品，企业级数据管理解决方案。',
    'Navicat Premium': '数据库管理工具，支持多种数据库连接和操作。',
    DBeaver: '免费多平台数据库工具，支持几乎所有主流数据库。',

    // 系统工程
    LabVIEW: '图形化编程环境，用于测试、测量和控制系统开发。',
    Keil: '嵌入式系统开发工具，用于ARM和C51单片机编程。',
    'Quartus II': 'FPGA和CPLD设计软件，用于可编程逻辑器件开发。',
    Step7: '西门子PLC编程软件，用于工业自动化控制。',
    PowerMill: '高速数控加工CAM软件，用于复杂零件加工编程。',

    // 图像处理
    PS: 'Adobe专业图像处理软件，图像编辑和设计行业标准。',
    Illustrator: '矢量图形设计软件，用于创建标志、插图和排版。',
    'Clip Studio Paint': '数字绘画和漫画创作软件，适合插画师使用。',
    'Corel Painter': '数字艺术绘画软件，模拟传统绘画媒介效果。',
    Krita: '开源数字绘画软件，提供丰富的画笔和工具。',

    // 媒体制作
    PR: 'Adobe专业视频编辑软件，用于电影、电视和网络视频制作。',
    AE: '视频特效和动态图形制作软件，用于后期合成。',
    剪映: '抖音官方视频编辑工具，简单易用，适合短视频制作。',
    Audition: '专业音频编辑软件，用于录制、混音和音频修复。',
    DaVinci: '专业调色和剪辑软件，广泛用于电影和电视后期制作。',
    Maya: '3D动画、建模、仿真和渲染软件，用于电影和游戏制作。',

    // 3D创作
    Blender: '免费开源3D创作套件，支持建模、动画、渲染等功能。',
    C4D: '专业3D建模、动画和渲染软件，界面友好，易于学习。',
    ZBrush: '数字雕刻软件，用于创建高细节3D模型。',
    'Marvelous Designer': '3D服装设计软件，用于创建逼真的服装模型。',
    Marmoset: '实时3D渲染和纹理烘焙工具，用于游戏美术制作。',

    // 设计工具
    'Adobe XD': '用户体验设计工具，用于网站和应用原型设计。',
    Axure: '专业原型设计工具，支持交互式原型和规格文档。',
    SketchBook: '数字绘图和绘画应用，适合概念设计和插图。',
    jewelCAD: '珠宝设计软件，用于精确建模和渲染珠宝作品。',

    // BIM设计
    Revit: '建筑信息模型(BIM)软件，用于建筑设计和文档。',
    ArchiCAD: '建筑设计BIM软件，强调3D建模和2D绘图集成。',
    Vectorworks: '跨平台CAD和BIM软件，用于建筑、景观和娱乐设计。',
    Tekla: '结构BIM软件，专注于钢结构和混凝土结构设计。',
    Navisworks: 'BIM项目审阅软件，用于模型整合和碰撞检测。',

    // 建筑CAD
    CAD: '通用CAD设计软件，广泛用于建筑和工程制图。',
    天正软件: '国产建筑设计软件，基于AutoCAD平台开发。',
    浩辰CAD: '国产CAD软件，兼容AutoCAD，价格实惠。',

    // 可视化工具
    Lumion: '建筑可视化软件，快速创建高质量3D渲染和动画。',
    Enscape: '实时渲染插件，与多种CAD软件集成，即时可视化设计。',
    'V-Ray': '专业渲染引擎，用于创建照片级真实渲染图。',
    Fuzor: 'BIM可视化工具，支持虚拟现实和实时协作。',
    Artlantis: '建筑和设计渲染软件，易于使用，渲染效果出色。',

    // 规划分析
    ArcGIS: '地理信息系统软件，用于地图创建和空间分析。',
    'SketchUp SU': '3D建模软件，简单易学，适合概念设计和规划。',

    // 机械设计
    SolidWorks: '3D CAD设计软件，广泛用于机械工程和产品设计。',
    'UG NX': '高端CAD/CAM/CAE集成解决方案，用于复杂产品开发。',
    Inventor: 'Autodesk的3D机械设计软件，提供装配和仿真功能。',
    CATIA: '高端3D设计软件，用于航空航天和汽车行业产品开发。',
    Creo: '参数化3D建模软件，前身为Pro/ENGINEER，功能强大。',

    // CAM加工
    Mastercam: '计算机辅助制造软件，用于CNC编程和加工控制。',
    hyperMILL: '高性能CAM软件，支持多轴和复杂加工策略。',
    'CIMCO Edit': 'CNC程序编辑和通信软件，用于机床编程。',
    VERICUT: 'CNC仿真软件，用于验证、优化和分析NC代码。',

    // 产品渲染
    KeyShot: '实时3D渲染软件，简单易用，渲染效果出色。',
    Vred: '汽车设计可视化软件，用于高质量产品渲染。',
    Modo: '3D建模、纹理和渲染软件，用于创建精美产品视觉效果。',

    // 工业软件
    'Solid Edge': '中端3D CAD软件，适合中小企业产品设计。',
    'ABB RobotStudio': '机器人编程和仿真软件，用于工业自动化。',
    组态王: '工业自动化监控软件，用于过程控制和数据采集。',

    // 材料计算
    'Materials Studio': '材料模拟和建模软件，用于材料科学研究。',
    JMatPro: '材料性能计算软件，用于合金设计和性能预测。',
    'Solid Converter PDF': 'PDF转换工具，用于转换和编辑技术文档。',

    // 化学工具
    ChemDraw: '化学结构绘图软件，用于分子结构设计和表示。',
    Dynaform: '钣金成形仿真软件，用于模具设计和工艺优化。',
    Moldflow: '注塑成型仿真软件，用于塑料部件和模具设计。',

    // 工艺仿真
    COMSOL: '多物理场仿真软件，用于各种工程问题建模和分析。',
    Tecplot: '科学可视化软件，用于CFD和其他数值模拟结果分析。',
    'Ansys Lumerical': '光子学设计软件，用于光学器件和纳米光子学仿真。',

    // 电路设计
    'Altium Designer': '专业PCB设计软件，用于电子产品开发。',
    Cadence: '集成电路设计工具，用于芯片设计和验证。',
    Proteus: '电子设计自动化软件，集成电路图设计和仿真。',
    Epaln: '电气工程设计软件，用于电气系统规划和文档。',

    // 信号仿真
    Multisim: '电路设计和仿真软件，适合电子工程教育和研究。',
    PSIM: '电力电子仿真软件，专注于开关电源和电机驱动设计。',
    'TIA Portal': '西门子自动化工程软件，用于PLC和HMI编程。',
    'GX Works': '三菱PLC编程软件，用于工业自动化控制系统开发。',

    // 控制系统
    WinCC: '过程可视化系统，用于工业过程监控和控制。',
    SimLab: '控制系统仿真软件，用于控制算法开发和测试。',
    MotorSolve: '电机设计和分析软件，用于电机性能优化。',

    // 遥感分析
    ENVI: '遥感图像处理软件，用于卫星和航空影像分析。',
    'PCI Geomatica': '遥感和图像处理软件，用于地理空间数据分析。',
    'Global Mapper': 'GIS数据处理工具，支持多种地理空间数据格式。',

    // GIS开发
    'ArcGIS Pro': '专业地理信息系统软件，用于空间数据分析和可视化。',
    SuperMap: '国产GIS软件，提供全面的地理信息系统解决方案。',
    QGIS: '开源地理信息系统，功能丰富，免费使用。',

    // 测量工具
    'Google Earth': '虚拟地球仪软件，提供卫星图像和地形数据。',
    'Civil 3D': '土木工程设计软件，用于测量、土方和基础设施设计。',
    'midas Civil': '土木结构分析软件，用于桥梁和基础设施设计。',

    // 统计分析
    SPSS: '统计分析软件，广泛用于社会科学研究和市场调查。',
    SAS: '高级分析软件，用于商业智能和预测分析。',
    EViews: '计量经济学软件，用于时间序列分析和预测。',
    Origin: '数据分析和绘图软件，用于科学研究和工程应用。',
    Minitab: '统计软件，用于质量改进和六西格玛项目。',

    // 商务智能
    Tableau: '数据可视化工具，用于商业智能和数据分析。',
    PowerBI: '微软商业智能工具，用于数据可视化和分析。',
    'Design Exper': '实验设计和分析软件，用于优化产品和工艺。',

    // 计量经济
    Stata: '数据分析和统计软件，广泛用于经济学和生物统计学。',
    Mplus: '潜变量建模软件，用于结构方程模型分析。',
    NCSS: '统计和数据分析软件，界面友好，易于使用。',

    // 生物分析
    Oligo: '寡核苷酸设计软件，用于PCR引物和探针设计。',
    Cytoscape: '生物网络可视化软件，用于分子相互作用网络分析。',
    Meshmixer: '3D模型编辑软件，用于生物医学模型处理。',

    // 医学影像
    'Materialise Mimic': '医学影像处理软件，用于3D打印和手术规划。',
    DxO: '图像处理软件，用于医学图像增强和分析。',

    // 实验工具
    Prism: '科学绘图和统计分析软件，广泛用于生物医学研究。',
    AxMath_Bio: '科学公式编辑器，用于编写复杂数学公式。',
    PASS: '统计检验力分析软件，用于样本量计算和实验设计。',

    // 光学设计
    'Zemax OpticStudio': '光学系统设计软件，用于镜头和光学仪器开发。',
    Lightroom: '照明设计软件，用于光学系统和照明产品开发。',
    FredOptics: '光线追踪软件，用于光学系统分析和优化。',

    // 物理仿真
    'ANSYS Electronics': '电磁场仿真软件，用于电子设备设计和分析。',

    // 数据处理
    SigmaPlot: '科学绘图和数据分析软件，用于创建高质量图表。',
    'FX Draw Tools': '数学绘图工具，用于创建数学图形和函数图像。',

    // 结构分析
    Ansys: '工程仿真软件，用于结构、流体、电磁等多物理场分析。',
    'midas Gen': '结构分析软件，用于建筑和土木工程结构设计。',
    PLAXIS: '岩土工程有限元分析软件，用于地基和基础设计。',
    FLAC3D: '三维显式有限差分软件，用于岩土力学分析。',

    // 岩土工具
    GeoStudio: '岩土工程分析软件，用于边坡稳定和渗流分析。',
    CivilFEM: '土木工程有限元分析软件，基于Ansys平台。',
    Plaxis: '岩土工程有限元软件，用于地基变形和稳定性分析。',

    // 水处理模拟
    EPANET: '供水网络分析软件，用于水力和水质模拟。',

    // 科学计算
    MATLAB: '数值计算环境，广泛用于工程计算、数据分析和算法开发。',
    Mathematica: '技术计算软件，集成符号计算、数值计算和可视化功能。',
    Maple: '符号和数值计算软件，用于数学教育和研究。',
    MathCAD: '工程计算软件，结合方程、文本和图形于一体。',

    // 公式工具
    MathType: '数学公式编辑器，用于创建复杂数学表达式。',
    AxMath_Formula: '科学公式编辑器，支持LaTeX和MathML格式。',
    LaTeX: '排版系统，特别适合科技论文和数学公式排版。',

    // 算法建模
    LINGO: '数学优化建模语言和求解器，用于线性和非线性规划问题。',
    'IBM CPLEX': '高性能数学规划求解器，用于优化问题求解。',
    Gurobi: '商业数学优化求解器，用于求解大规模优化问题。',
  }

  // 如果没有特定描述，返回通用描述
  return (
    descriptions[productName] ||
    `${productName}是一款专业软件，为用户提供高效的工作体验和丰富的功能。`
  )
}

onMounted(() => {
  // 初始化二级导航选中项
  activeSubcategory.value = subcategories.value[0] || ''

  const svg = document.getElementById('svg')
  const text = document.getElementById('text')
  const offscreenText = document.getElementById('offscreen-text')
  const input = document.getElementById('input') as HTMLInputElement

  if (!svg || !text || !offscreenText || !input) return

  // 初始化尺寸
  const resizePage = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight * 0.2 // 使用20%的视口高度

    if (svg instanceof SVGElement) {
      svg.setAttribute('height', height.value.toString())
      svg.setAttribute('width', width.value.toString())
      svg.setAttribute('viewBox', `0 0 ${width.value} ${height.value}`)
    }

    resizeLetters()
  }

  // 调整字母大小
  const resizeLetters = () => {
    textSize.value = (width.value / (letters.value.length + 2)) * 0.8 // 减小20%的字体大小
    if (textSize.value > 80) textSize.value = 80 // 最大值也减小20%

    text.style.fontSize = `${textSize.value}px`
    text.style.height = `${textSize.value}px`
    text.style.lineHeight = `${textSize.value}px`
    offscreenText.style.fontSize = `${textSize.value}px`

    const textRect = text.getBoundingClientRect()
    textCenter.value = textRect.top + textRect.height / 2

    positionLetters()
  }

  // 定位字母
  const positionLetters = () => {
    letters.value.forEach((letter) => {
      const timing = letter.shift ? 0.1 : 0
      gsap.to(letter.onScreen, {
        duration: timing,
        x: letter.offScreen.offsetLeft + 'px',
        ease: 'power3.inOut',
      })
      letter.shift = true
    })
  }

  // 字母进入动画
  const animateLetterIn = (letter: HTMLElement) => {
    const yOffset = (0.5 + Math.random() * 0.5) * textSize.value

    gsap.fromTo(
      letter,
      { scale: 0, opacity: 0 },
      { duration: 0.4, scale: 1, opacity: 1, ease: 'back.out' },
    )

    gsap.to(letter, { duration: 0.2, y: -yOffset, ease: 'power3.inOut' })
    gsap.to(letter, { duration: 0.2, y: 0, ease: 'power3.inOut', delay: 0.2 })

    const rotation = -50 + Math.random() * 100
    gsap.to(letter, { duration: 0.2, rotation: rotation, ease: 'power3.inOut' })
    gsap.to(letter, { duration: 0.2, rotation: 0, ease: 'power3.inOut', delay: 0.2 })
  }

  // 添加装饰
  const addDecor = (letter: HTMLElement, color: { main: string; shades: string[] }) => {
    setTimeout(() => {
      const x0 = letter.offsetLeft + letter.offsetWidth / 2
      const y0 = textCenter.value - textSize.value * 0.5
      const shade = color.shades[Math.floor(Math.random() * 4)]

      for (let i = 0; i < 8; i++) addTri(x0, y0, shade)
      for (let i = 0; i < 8; i++) addCirc(x0, y0)
    }, 150)
  }

  // 添加三角形
  const addTri = (x0: number, y0: number, shade: string) => {
    const svgElement = document.getElementById('svg')
    if (!svgElement) return

    const tri = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    const a = Math.random()
    const a2 = a + (-0.2 + Math.random() * 0.4)
    const r = textSize.value * 0.52
    const r2 = r + textSize.value * Math.random() * 0.2
    const x = x0 + r * Math.cos(2 * Math.PI * a)
    const y = y0 + r * Math.sin(2 * Math.PI * a)
    const x2 = x0 + r2 * Math.cos(2 * Math.PI * a2)
    const y2 = y0 + r2 * Math.sin(2 * Math.PI * a2)
    const triSize = textSize.value * 0.1
    const scale = 0.3 + Math.random() * 0.7
    const offset = triSize * scale

    tri.setAttribute('points', `0,0 ${triSize * 2},0 ${triSize},${triSize * 2}`)
    tri.style.fill = shade
    svgElement.appendChild(tri)

    gsap.fromTo(
      tri,
      {
        rotation: Math.random() * 360,
        scale: scale,
        x: x - offset,
        y: y - offset,
        opacity: 1,
      },
      {
        duration: 0.6,
        x: x2 - offset,
        y: y2 - offset,
        opacity: 0,
        ease: 'power1.inOut',
        onComplete: () => {
          if (svgElement.contains(tri)) {
            svgElement.removeChild(tri)
          }
        },
      },
    )
  }

  // 添加圆形
  const addCirc = (x0: number, y0: number) => {
    const svgElement = document.getElementById('svg')
    if (!svgElement) return

    const circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    const a = Math.random()
    const r = textSize.value * 0.52
    const r2 = r + textSize.value
    const x = x0 + r * Math.cos(2 * Math.PI * a)
    const y = y0 + r * Math.sin(2 * Math.PI * a)
    const x2 = x0 + r2 * Math.cos(2 * Math.PI * a)
    const y2 = y0 + r2 * Math.sin(2 * Math.PI * a)
    const circSize = textSize.value * 0.05 * Math.random()

    circ.setAttribute('r', circSize.toString())
    circ.style.fill = '#eee'
    svgElement.appendChild(circ)

    gsap.fromTo(
      circ,
      {
        x: x - circSize,
        y: y - circSize,
        opacity: 1,
      },
      {
        duration: 0.6,
        x: x2 - circSize,
        y: y2 - circSize,
        opacity: 0,
        ease: 'power1.inOut',
        onComplete: () => {
          if (svgElement.contains(circ)) {
            svgElement.removeChild(circ)
          }
        },
      },
    )
  }

  // 添加字母
  const addLetter = (char: string, i: number) => {
    const letter = document.createElement('span')
    const oLetter = document.createElement('span')

    // 确保显示大写字母
    letter.innerHTML = char.toUpperCase()
    oLetter.innerHTML = char.toUpperCase()

    text.appendChild(letter)
    const color = colors[i % colors.length]
    letter.style.color = color.main

    offscreenText.appendChild(oLetter)
    letters.value[i] = { offScreen: oLetter, onScreen: letter, char: char }

    animateLetterIn(letter)
    addDecor(oLetter, color)
  }

  // 添加多个字母
  const addLetters = (value: string[]) => {
    value.forEach((char, i) => {
      if (letters.value[i] && letters.value[i].char !== char) {
        // 确保显示大写字母
        letters.value[i].onScreen.innerHTML = char.toUpperCase()
        letters.value[i].offScreen.innerHTML = char.toUpperCase()
        letters.value[i].char = char
      }
      if (letters.value[i] === undefined) {
        addLetter(char, i)
      }
    })
  }

  // 字母退出动画
  const animateLetterOut = (letter: Letter, i: number) => {
    gsap.to(letter.onScreen, {
      duration: 0.1,
      scale: 0,
      opacity: 0,
      ease: 'power2.in',
      onComplete: () => {
        if (offscreenText.contains(letter.offScreen)) {
          offscreenText.removeChild(letter.offScreen)
        }
        if (text.contains(letter.onScreen)) {
          text.removeChild(letter.onScreen)
        }
        positionLetters()
      },
    })

    letters.value.splice(i, 1)
  }

  // 移除字母
  const removeLetters = (value: string[]) => {
    for (let i = letters.value.length - 1; i >= 0; i--) {
      const letter = letters.value[i]
      if (value[i] === undefined) {
        animateLetterOut(letter, i)
      }
    }
  }

  // 输入变化处理
  const onInputChange = () => {
    let value: string[]

    // 当输入框为空时，显示placeholder文字
    if (input.value === '') {
      value = placeholderText.value.toUpperCase().split('')
    } else {
      value = input.value.toUpperCase().split('')
    }

    addLetters(value)
    removeLetters(value)
    resizeLetters()
  }

  // 键盘事件处理
  const keyup = () => {
    // 更新搜索查询
    searchQuery.value = input.value
    onInputChange()
  }

  // 初始化
  resizePage()
  window.addEventListener('resize', resizePage)
  input.addEventListener('keyup', keyup)

  // 设置初始显示为placeholder文字
  const initialText = placeholderText.value
  addLetters(initialText.split(''))
  resizeLetters()

  // 聚焦输入框但不显示输入内容
  input.focus()
  input.value = ''
})

// 已被tryOtherFormats替代的函数，可以删除

// 获取产品图片路径，尝试多种格式
const getProductImageSrc = (productName: string): string => {
  // 先尝试PNG格式
  return `/picture/${productName}.png`
}

// 处理图片加载错误，尝试不同格式
const tryOtherFormats = (e: Event) => {
  const target = e.target as HTMLImageElement
  const productName = target.alt
  const currentSrc = target.src

  // 如果当前是PNG格式，尝试JPG
  if (currentSrc.endsWith('.png')) {
    target.src = `/picture/${productName}.jpg`
    return
  }

  // 如果当前是JPG格式，尝试JPEG
  if (currentSrc.endsWith('.jpg')) {
    target.src = `/picture/${productName}.jpeg`
    return
  }

  // 如果都失败了，使用默认图片
  target.src = '/xiaoxin/58.jpg'
}
</script>

<template>
  <div class="home-page">
    <section class="typing-section">
      <div class="typing-container">
        <p id="offscreen-text" class="offscreen-text"></p>
        <p id="text" class="text"></p>

        <svg id="svg"></svg>
      </div>
    </section>

    <!-- 双层导航 -->
    <section class="double-nav">
      <div class="primary-nav">
        <div class="nav-container">
          <div
            v-for="category in categories"
            :key="category"
            class="nav-item"
            :class="{ active: activeCategory === category }"
            @click="switchCategory(category)"
          >
            {{ category }}
          </div>
        </div>
      </div>

      <div class="secondary-nav">
        <div class="nav-container">
          <!-- 分类标题 -->
          <h3 class="category-title">{{ activeCategory.replace(/^[^ ]+ /, '') }}</h3>

          <div
            v-for="subcategory in subcategories"
            :key="subcategory"
            class="sub-nav-item"
            :class="{ active: activeSubcategory === subcategory }"
            @click="switchSubcategory(subcategory)"
          >
            {{ subcategory }}
          </div>
        </div>
      </div>

      <!-- 子分类描述区域 - 移动到这里 -->
      <div class="subcategory-description" v-if="activeSubcategory || searchQuery.trim()">
        <div v-if="searchQuery.trim()">
          <p class="search-suggestion">
            搜索结果: "{{ searchQuery }}" (找到 {{ searchedProducts.length }} 个软件)
          </p>
          <div class="product-names">
            <h3 v-for="product in searchedProducts" :key="product.id" class="product-name">
              {{ product.name }}
            </h3>
          </div>
        </div>
        <div v-else>
          <p class="search-suggestion">避免软件重复归类，大家尽量使用右上角搜索功能</p>
          <div class="product-names">
            <h3 v-for="product in categoryProducts" :key="product.id" class="product-name">
              {{ product.name }}
            </h3>
          </div>
        </div>
      </div>
    </section>

    <!-- 商品展示区域 -->
    <section class="products-section">
      <div class="products-container">
        <div v-if="filteredProducts.length === 0 && searchQuery.trim()" class="no-results">
          <p>没有找到与 "{{ searchQuery }}" 匹配的软件，请尝试其他关键词</p>
        </div>
        <div v-for="product in filteredProducts" :key="product.id" class="card">
          <div class="tools">
            <div class="circle">
              <span class="red box"></span>
            </div>
            <div class="circle">
              <span class="yellow box"></span>
            </div>
            <div class="circle">
              <span class="green box"></span>
            </div>
          </div>
          <div class="card__content">
            <div class="logo-container">
              <img
                :src="getProductImageSrc(product.name)"
                :alt="product.name"
                class="product-logo"
                @error="tryOtherFormats"
              />
            </div>
            <h3>{{ product.name }}</h3>
            <p>{{ product.category }}</p>
            <p class="product-desc">{{ getProductDescription(product.name) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 免责声明 -->
    <section class="disclaimer-section">
      <div class="disclaimer-container">
        <h3>免责声明</h3>
        <p>
          本站提供的所有软件和资料均为网络收集，仅供学习和研究使用，不得用于任何商业用途。否则，一切后果请用户自负。本站并不承担任何法律责任。如果侵犯了您的知识产权或其他权利，责任由使用者或转载者本人承担，本公众号以及本人对此不承担任何责任。同时您必须在下载后的24个小时之内，从您的电脑中彻底删除该程序。如果您喜欢该程序，请支持正版软件，购买注册，得到更好的正版服务。我们提供下载的内容均来自互联网。如有内容侵犯您的版权或其他利益的，请编辑邮件并加以说明发送到我们的邮箱qianhouziyuan@foxmail.com，我们会在收到消息后七个工作日内处理。
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  width: 100%;
}

/* 高度设置为视口高度的20% */
.typing-section {
  width: 100%;
  height: 15vh; /* 视口高度(viewport height)的20% */
  position: relative;
  overflow: hidden;
}

/* 继承父元素typing-section的100%高度 */
.typing-container {
  width: 100%;
  height: 100%; /* 继承父元素typing-section的高度 */
  position: relative;
}

svg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.input {
  position: absolute;
  z-index: 1;
  bottom: 20px;
  font-size: 20px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'JingNanBoBo', sans-serif;
  background: none;
  border: 1px solid #ddd;
  color: #333;
  padding: 8px 16px;
  border-radius: 4px;
  width: 80%;
  max-width: 400px;
}

.text,
.offscreen-text {
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  position: absolute;
  margin: 0;
  text-align: center;
}

.offscreen-text {
  text-align: center;
  top: -9999px;
}

.text span {
  position: absolute;
}

/* 双层导航样式 */
.double-nav {
  width: 100%;
  background-color: #ffffff;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 已删除边框阴影 */
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0px 15px;
}

.primary-nav {
  width: 100%;
  border-bottom: 1px solid #eaeaea;
  padding: 10px 0;
}

.primary-nav .nav-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(2, auto);
  max-width: 1200px;
  gap: 10px;
  justify-content: center;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .primary-nav .nav-container {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-template-rows: auto;
  }
}

.primary-nav .nav-item {
  padding: 10px 15px;
  font-size: 15px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  text-align: center;
  border-radius: 5px;
}

.primary-nav .nav-item:hover {
  color: #1890ff;
  background-color: rgba(24, 144, 255, 0.05);
  font-size: 15px;
}

.primary-nav .nav-item.active {
  color: #1890ff;
  font-weight: bold;
  background-color: rgba(24, 144, 255, 0.1);
  font-size: 15px;
}

.primary-nav .nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 60%;
  height: 3px;
  background-color: #1890ff;
}

.secondary-nav {
  width: 100%;
  background-color: #f5f5f5;
}

.secondary-nav .sub-nav-item {
  padding: 10px 20px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.secondary-nav .sub-nav-item:hover {
  color: #1890ff;
}

.secondary-nav .sub-nav-item.active {
  color: #1890ff;
  font-weight: bold;
  font-size: 18px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .primary-nav .nav-item,
  .secondary-nav .sub-nav-item {
    padding: 10px 15px;
    font-size: 14px;
  }

  .primary-nav .nav-item.active::after {
    left: 20%;
    width: 60%;
  }
}

/* 分类标题样式 */
.category-title {
  font-size: 16px;
  color: #333;
  border-left: 4px solid #1890ff;
  padding: 0 15px 0 10px;
  margin-right: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.secondary-nav .nav-container {
  display: flex;
  align-items: center;
}

/* 商品卡片样式 */
.products-section {
  padding: 20px;
  background-color: #f5f5f5;
}

/* 子分类描述样式 */
.subcategory-description {
  max-width: 100%;
  margin: 0 auto 0px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-suggestion {
  font-size: 18px;
  color: #ff6b6b;
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
}

.product-names {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.product-name {
  font-size: 14px;
  color: #333;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 4px;
  margin: 0;
  font-weight: normal;
}

.subcategory-description h2 {
  font-size: 22px;
  color: #333;
  margin-bottom: 15px;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 10px;
  display: inline-block;
}

.subcategory-description p {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}

.products-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 20px;
  padding: 20px;
}

.card {
  width: 190px;
  height: 280px; /* 增加高度以容纳logo和描述文本 */
  margin: 0 auto;
  background-color: #f8fbfe;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.tools {
  display: flex;
  align-items: center;
  padding: 9px;
}

.circle {
  padding: 0 4px;
}

.box {
  display: inline-block;
  align-items: center;
  width: 10px;
  height: 10px;
  padding: 1px;
  border-radius: 50%;
}

.red {
  background-color: #ff605c;
}

.yellow {
  background-color: #ffbd44;
}

.green {
  background-color: #00ca4e;
}

.card__content {
  padding: 15px;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.product-logo {
  max-width: 80%;
  max-height: 50px;
  object-fit: contain;
}

.card__content h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

.card__content p {
  font-size: 14px;
  color: #666;
}

.card__content p.product-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  margin-top: 8px;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.no-results {
  text-align: center;
  margin: 20px 0;
  color: #ff6b6b;
  font-size: 18px;
  font-weight: bold;
  grid-column: 1 / -1;
  padding: 40px;
  background-color: #f8fbfe;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 免责声明样式 */
.disclaimer-section {
  padding: 60px;
  background-color: #ffffff;
}

.disclaimer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.disclaimer-container h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
}

.disclaimer-container p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}
</style>
