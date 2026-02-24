// ─── Children's Quiz – Questions Database ──────────────────────────────────
// Stages 1-3 are hand-crafted (60 questions total).
// generateAllQuestions() programmatically fills stages 4-50.

// ── Stage 1 – Easy (questions 1-20) ────────────────────────────────────────
const stage1Questions = [
  {
    id: 1, stage: 1, difficulty: 'easy', category: 'الحيوانات', points: 10,
    question: 'ما هو صوت الأسد؟',
    options: ['يزأر', 'ينبح', 'يموء', 'يصفر'],
    correctAnswer: 0,
  },
  {
    id: 2, stage: 1, difficulty: 'easy', category: 'الحيوانات', points: 10,
    question: 'كم عدد أرجل الحشرة؟',
    options: ['أربعة', 'ستة', 'ثمانية', 'اثنان'],
    correctAnswer: 1,
  },
  {
    id: 3, stage: 1, difficulty: 'easy', category: 'الرياضيات', points: 10,
    question: 'كم يساوي ٢ + ٢؟',
    options: ['٣', '٥', '٤', '٦'],
    correctAnswer: 2,
  },
  {
    id: 4, stage: 1, difficulty: 'easy', category: 'الرياضيات', points: 10,
    question: 'كم يساوي ١٠ - ٣؟',
    options: ['٦', '٧', '٨', '٩'],
    correctAnswer: 1,
  },
  {
    id: 5, stage: 1, difficulty: 'easy', category: 'الجغرافيا', points: 10,
    question: 'ما هي عاصمة المملكة العربية السعودية؟',
    options: ['جدة', 'مكة المكرمة', 'الرياض', 'الدمام'],
    correctAnswer: 2,
  },
  {
    id: 6, stage: 1, difficulty: 'easy', category: 'العلوم', points: 10,
    question: 'ما هو لون السماء في يوم صافٍ؟',
    options: ['أخضر', 'أزرق', 'أصفر', 'أحمر'],
    correctAnswer: 1,
  },
  {
    id: 7, stage: 1, difficulty: 'easy', category: 'الحيوانات', points: 10,
    question: 'أي من هذه الحيوانات يعيش في البحر؟',
    options: ['الأسد', 'الفيل', 'الحوت', 'الفهد'],
    correctAnswer: 2,
  },
  {
    id: 8, stage: 1, difficulty: 'easy', category: 'النباتات', points: 10,
    question: 'ما الذي تصنعه النباتات من ضوء الشمس؟',
    options: ['الماء', 'الهواء', 'الغذاء', 'التربة'],
    correctAnswer: 2,
  },
  {
    id: 9, stage: 1, difficulty: 'easy', category: 'الرياضيات', points: 10,
    question: 'كم عدد أيام الأسبوع؟',
    options: ['٥', '٦', '٧', '٨'],
    correctAnswer: 2,
  },
  {
    id: 10, stage: 1, difficulty: 'easy', category: 'الجغرافيا', points: 10,
    question: 'ما هي أكبر قارة في العالم؟',
    options: ['أفريقيا', 'أمريكا', 'أستراليا', 'آسيا'],
    correctAnswer: 3,
  },
  {
    id: 11, stage: 1, difficulty: 'easy', category: 'العلوم', points: 10,
    question: 'ما هو أكبر كوكب في المجموعة الشمسية؟',
    options: ['الأرض', 'زحل', 'المشتري', 'أورانوس'],
    correctAnswer: 2,
  },
  {
    id: 12, stage: 1, difficulty: 'easy', category: 'اللغات', points: 10,
    question: 'كم حرفًا في الأبجدية العربية؟',
    options: ['٢٤', '٢٦', '٢٨', '٣٠'],
    correctAnswer: 2,
  },
  {
    id: 13, stage: 1, difficulty: 'easy', category: 'الحيوانات', points: 10,
    question: 'أي حيوان يُعرف بـ"ملك الغابة"؟',
    options: ['النمر', 'الأسد', 'الفيل', 'الدب'],
    correctAnswer: 1,
  },
  {
    id: 14, stage: 1, difficulty: 'easy', category: 'الرياضيات', points: 10,
    question: 'كم يساوي ٥ × ٢؟',
    options: ['٧', '٨', '٩', '١٠'],
    correctAnswer: 3,
  },
  {
    id: 15, stage: 1, difficulty: 'easy', category: 'العلوم', points: 10,
    question: 'ما الذي يجعل قوس قزح يظهر؟',
    options: ['الريح', 'المطر وضوء الشمس', 'البرق', 'الثلج'],
    correctAnswer: 1,
  },
  {
    id: 16, stage: 1, difficulty: 'easy', category: 'الجغرافيا', points: 10,
    question: 'في أي بلد تقع برج إيفل؟',
    options: ['إيطاليا', 'إسبانيا', 'فرنسا', 'ألمانيا'],
    correctAnswer: 2,
  },
  {
    id: 17, stage: 1, difficulty: 'easy', category: 'الحيوانات', points: 10,
    question: 'ماذا يأكل الأرنب؟',
    options: ['اللحوم', 'الأسماك', 'الجزر والخضروات', 'الحشرات'],
    correctAnswer: 2,
  },
  {
    id: 18, stage: 1, difficulty: 'easy', category: 'النباتات', points: 10,
    question: 'أي جزء من النبات يمتص الماء من التربة؟',
    options: ['الأوراق', 'الجذور', 'الساق', 'الزهرة'],
    correctAnswer: 1,
  },
  {
    id: 19, stage: 1, difficulty: 'easy', category: 'الرياضة', points: 10,
    question: 'كم عدد لاعبي كرة القدم في الفريق الواحد؟',
    options: ['٩', '١٠', '١١', '١٢'],
    correctAnswer: 2,
  },
  {
    id: 20, stage: 1, difficulty: 'easy', category: 'معلومات عامة', points: 10,
    question: 'كم عدد ألوان علم المملكة العربية السعودية؟',
    options: ['١', '٢', '٣', '٤'],
    correctAnswer: 1,
  },
];

// ── Stage 2 – Easy/Medium (questions 21-40) ─────────────────────────────────
const stage2Questions = [
  {
    id: 21, stage: 2, difficulty: 'easy', category: 'العلوم', points: 10,
    question: 'ما حالات المادة الثلاث؟',
    options: ['صلب وسائل وغاز', 'ماء وهواء وتراب', 'ثلج وماء وبخار فقط', 'خشب وحديد وبلاستيك'],
    correctAnswer: 0,
  },
  {
    id: 22, stage: 2, difficulty: 'easy', category: 'الجغرافيا', points: 10,
    question: 'ما هي عاصمة مصر؟',
    options: ['الإسكندرية', 'أسوان', 'القاهرة', 'الأقصر'],
    correctAnswer: 2,
  },
  {
    id: 23, stage: 2, difficulty: 'easy', category: 'الرياضيات', points: 10,
    question: 'كم يساوي ٣ × ٣؟',
    options: ['٦', '٨', '٩', '١٢'],
    correctAnswer: 2,
  },
  {
    id: 24, stage: 2, difficulty: 'easy', category: 'الحيوانات', points: 10,
    question: 'أي الحيوانات أطول عنقًا؟',
    options: ['الفيل', 'الزرافة', 'الجمل', 'الحصان'],
    correctAnswer: 1,
  },
  {
    id: 25, stage: 2, difficulty: 'easy', category: 'العلوم', points: 10,
    question: 'ما هو النجم الأقرب إلى الأرض؟',
    options: ['سيريوس', 'الشمس', 'القطبي', 'المريخ'],
    correctAnswer: 1,
  },
  {
    id: 26, stage: 2, difficulty: 'medium', category: 'التاريخ', points: 20,
    question: 'من بنى الأهرامات؟',
    options: ['الرومان', 'اليونانيون', 'الفراعنة المصريون', 'العرب'],
    correctAnswer: 2,
  },
  {
    id: 27, stage: 2, difficulty: 'medium', category: 'العلوم', points: 20,
    question: 'ما الغاز الذي نتنفسه للحياة؟',
    options: ['ثاني أكسيد الكربون', 'الهيدروجين', 'الأكسجين', 'النيتروجين'],
    correctAnswer: 2,
  },
  {
    id: 28, stage: 2, difficulty: 'easy', category: 'الرياضيات', points: 10,
    question: 'كم عدد أضلاع المثلث؟',
    options: ['٢', '٣', '٤', '٥'],
    correctAnswer: 1,
  },
  {
    id: 29, stage: 2, difficulty: 'easy', category: 'النباتات', points: 10,
    question: 'ما هو أطول شجرة في العالم؟',
    options: ['النخلة', 'الأوكالبتوس', 'السيكويا', 'الصنوبر'],
    correctAnswer: 2,
  },
  {
    id: 30, stage: 2, difficulty: 'medium', category: 'الجغرافيا', points: 20,
    question: 'ما هو أعمق محيط في العالم؟',
    options: ['المحيط الهندي', 'المحيط الأطلسي', 'المحيط المتجمد', 'المحيط الهادئ'],
    correctAnswer: 3,
  },
  {
    id: 31, stage: 2, difficulty: 'medium', category: 'العلوم', points: 20,
    question: 'ماذا يحدث للماء عند تجميده؟',
    options: ['يتبخر', 'يصبح ثلجًا', 'يختفي', 'يتحول لغاز'],
    correctAnswer: 1,
  },
  {
    id: 32, stage: 2, difficulty: 'easy', category: 'الحيوانات', points: 10,
    question: 'أي من هذه الحيوانات لديه خرطوم؟',
    options: ['الفيل', 'الأسد', 'الدب', 'الحصان'],
    correctAnswer: 0,
  },
  {
    id: 33, stage: 2, difficulty: 'medium', category: 'الرياضيات', points: 20,
    question: 'كم يساوي ١٢ ÷ ٤؟',
    options: ['٢', '٣', '٤', '٥'],
    correctAnswer: 1,
  },
  {
    id: 34, stage: 2, difficulty: 'easy', category: 'الجغرافيا', points: 10,
    question: 'ما هو أكبر محيط في العالم؟',
    options: ['المحيط الهندي', 'المحيط الأطلسي', 'المحيط الهادئ', 'المحيط المتجمد'],
    correctAnswer: 2,
  },
  {
    id: 35, stage: 2, difficulty: 'medium', category: 'التاريخ', points: 20,
    question: 'في أي عام اكتشف كريستوف كولومبوس أمريكا؟',
    options: ['١٢٩٢م', '١٤٩٢م', '١٥٩٢م', '١٣٩٢م'],
    correctAnswer: 1,
  },
  {
    id: 36, stage: 2, difficulty: 'easy', category: 'الرياضة', points: 10,
    question: 'في أي رياضة يُستخدم المضرب والكرة الصغيرة على الطاولة؟',
    options: ['التنس', 'البادمنتون', 'تنس الطاولة', 'الاسكواش'],
    correctAnswer: 2,
  },
  {
    id: 37, stage: 2, difficulty: 'medium', category: 'العلوم', points: 20,
    question: 'كم عدد عظام جسم الإنسان البالغ؟',
    options: ['١٠٦', '٢٠٦', '٣٠٦', '٤٠٦'],
    correctAnswer: 1,
  },
  {
    id: 38, stage: 2, difficulty: 'easy', category: 'اللغات', points: 10,
    question: 'ما معنى كلمة "Book" بالعربية؟',
    options: ['قلم', 'كتاب', 'مدرسة', 'طالب'],
    correctAnswer: 1,
  },
  {
    id: 39, stage: 2, difficulty: 'medium', category: 'الجغرافيا', points: 20,
    question: 'ما هي عاصمة اليابان؟',
    options: ['بكين', 'سيول', 'طوكيو', 'بانكوك'],
    correctAnswer: 2,
  },
  {
    id: 40, stage: 2, difficulty: 'medium', category: 'معلومات عامة', points: 20,
    question: 'ما هو أسرع حيوان بري في العالم؟',
    options: ['الأسد', 'الفهد', 'الحصان', 'النمر'],
    correctAnswer: 1,
  },
];

// ── Stage 3 – Medium (questions 41-60) ──────────────────────────────────────
const stage3Questions = [
  {
    id: 41, stage: 3, difficulty: 'medium', category: 'العلوم', points: 20,
    question: 'ما هي الوحدة الأساسية للمادة الحية؟',
    options: ['الذرة', 'الجزيء', 'الخلية', 'البروتين'],
    correctAnswer: 2,
  },
  {
    id: 42, stage: 3, difficulty: 'medium', category: 'الرياضيات', points: 20,
    question: 'ما هي قيمة π (باي) تقريبًا؟',
    options: ['٢.١٤', '٣.١٤', '٤.١٤', '٥.١٤'],
    correctAnswer: 1,
  },
  {
    id: 43, stage: 3, difficulty: 'medium', category: 'التاريخ', points: 20,
    question: 'من هو مؤسس الدولة السعودية الأولى؟',
    options: ['الملك عبدالعزيز', 'الإمام محمد بن سعود', 'الملك سعود', 'الملك فيصل'],
    correctAnswer: 1,
  },
  {
    id: 44, stage: 3, difficulty: 'medium', category: 'الجغرافيا', points: 20,
    question: 'ما هو أطول نهر في العالم؟',
    options: ['نهر الأمازون', 'نهر النيل', 'نهر اليانغتسي', 'نهر المسيسيبي'],
    correctAnswer: 1,
  },
  {
    id: 45, stage: 3, difficulty: 'medium', category: 'العلوم', points: 20,
    question: 'ما اسم العملية التي تصنع فيها النباتات غذاءها؟',
    options: ['التنفس', 'البناء الضوئي', 'التخمر', 'الهضم'],
    correctAnswer: 1,
  },
  {
    id: 46, stage: 3, difficulty: 'medium', category: 'الحيوانات', points: 20,
    question: 'كم تدوم فترة حمل الفيل تقريبًا؟',
    options: ['٦ أشهر', '١٢ شهرًا', '١٨ شهرًا', '٢٢ شهرًا'],
    correctAnswer: 3,
  },
  {
    id: 47, stage: 3, difficulty: 'medium', category: 'الرياضيات', points: 20,
    question: 'كم يساوي ٧ × ٨؟',
    options: ['٤٨', '٥٤', '٥٦', '٦٤'],
    correctAnswer: 2,
  },
  {
    id: 48, stage: 3, difficulty: 'medium', category: 'الجغرافيا', points: 20,
    question: 'ما هي أكبر دولة في العالم مساحةً؟',
    options: ['الصين', 'الولايات المتحدة', 'كندا', 'روسيا'],
    correctAnswer: 3,
  },
  {
    id: 49, stage: 3, difficulty: 'medium', category: 'اللغات', points: 20,
    question: 'ما معنى كلمة "Friendship" بالعربية؟',
    options: ['الحرية', 'الصداقة', 'الشجاعة', 'الحكمة'],
    correctAnswer: 1,
  },
  {
    id: 50, stage: 3, difficulty: 'medium', category: 'التاريخ', points: 20,
    question: 'متى وُلد النبي محمد ﷺ؟',
    options: ['٥٧٠م', '٦١٠م', '٦٢٢م', '٦٣٢م'],
    correctAnswer: 0,
  },
  {
    id: 51, stage: 3, difficulty: 'medium', category: 'العلوم', points: 20,
    question: 'ما هو أصغر كوكب في المجموعة الشمسية؟',
    options: ['المريخ', 'عطارد', 'الزهرة', 'بلوتو (قزم)'],
    correctAnswer: 1,
  },
  {
    id: 52, stage: 3, difficulty: 'medium', category: 'الرياضة', points: 20,
    question: 'كم دقيقة تستمر مباراة كرة القدم؟',
    options: ['٦٠', '٧٥', '٩٠', '١٢٠'],
    correctAnswer: 2,
  },
  {
    id: 53, stage: 3, difficulty: 'medium', category: 'الحيوانات', points: 20,
    question: 'أي هذه الطيور لا تطير؟',
    options: ['العقاب', 'البطريق', 'الحمام', 'الببغاء'],
    correctAnswer: 1,
  },
  {
    id: 54, stage: 3, difficulty: 'medium', category: 'الجغرافيا', points: 20,
    question: 'ما هي أعلى قمة جبلية في العالم؟',
    options: ['جبل كليمنجارو', 'جبل ماكينلي', 'جبل إيفرست', 'جبل أكونكاغوا'],
    correctAnswer: 2,
  },
  {
    id: 55, stage: 3, difficulty: 'medium', category: 'العلوم', points: 20,
    question: 'ما الجهاز الذي يضخ الدم في جسم الإنسان؟',
    options: ['الرئة', 'الكبد', 'القلب', 'الكلية'],
    correctAnswer: 2,
  },
  {
    id: 56, stage: 3, difficulty: 'medium', category: 'الرياضيات', points: 20,
    question: 'كم يساوي ١٠٠ ÷ ٤؟',
    options: ['٢٠', '٢٥', '٣٠', '٤٠'],
    correctAnswer: 1,
  },
  {
    id: 57, stage: 3, difficulty: 'medium', category: 'النباتات', points: 20,
    question: 'ما الثمرة التي تُعدّ من الخضروات رغم أنها تحتوي بذورًا؟',
    options: ['الجزرة', 'البطاطا', 'الطماطم', 'البصل'],
    correctAnswer: 2,
  },
  {
    id: 58, stage: 3, difficulty: 'medium', category: 'التاريخ', points: 20,
    question: 'أي حضارة بنت الكولوسيوم؟',
    options: ['الإغريق', 'الرومان', 'الفرس', 'المصريون'],
    correctAnswer: 1,
  },
  {
    id: 59, stage: 3, difficulty: 'medium', category: 'معلومات عامة', points: 20,
    question: 'كم عدد قارات العالم؟',
    options: ['٥', '٦', '٧', '٨'],
    correctAnswer: 2,
  },
  {
    id: 60, stage: 3, difficulty: 'medium', category: 'العلوم', points: 20,
    question: 'ما مصدر طاقة الشمس؟',
    options: ['الاحتراق', 'الانشطار النووي', 'الاندماج النووي', 'الكيمياء'],
    correctAnswer: 2,
  },
];

// ── Base questions for programmatic generation (stages 4-50) ────────────────
const generatedQuestionsPool = [
  // Science
  { category: 'العلوم', question: 'ما اسم أول رائد فضاء بشري؟', options: ['نيل أرمسترونج', 'يوري غاغارين', 'بوز ألدرين', 'جون غلين'], correctAnswer: 1 },
  { category: 'العلوم', question: 'ما اسم الجهاز الذي يُكبّر الأجسام الصغيرة جدًا؟', options: ['التلسكوب', 'المجهر', 'المنظار', 'الميزان'], correctAnswer: 1 },
  { category: 'العلوم', question: 'ما العنصر الكيميائي الذي رمزه H؟', options: ['الهيليوم', 'الهيدروجين', 'الزئبق', 'الذهب'], correctAnswer: 1 },
  { category: 'العلوم', question: 'كم يستغرق الضوء من الشمس للوصول إلى الأرض؟', options: ['٨ ثوانٍ', '٨ دقائق', '٨ ساعات', '٨ أيام'], correctAnswer: 1 },
  { category: 'العلوم', question: 'ما اسم العالِم الذي اكتشف الجاذبية؟', options: ['أينشتاين', 'نيوتن', 'غاليليو', 'داروين'], correctAnswer: 1 },
  // Math
  { category: 'الرياضيات', question: 'كم يساوي ١٥ + ٢٧؟', options: ['٣٩', '٤٢', '٤٠', '٤٥'], correctAnswer: 1 },
  { category: 'الرياضيات', question: 'كم يساوي ٩ × ٩؟', options: ['٧٢', '٧٩', '٨١', '٨٤'], correctAnswer: 2 },
  { category: 'الرياضيات', question: 'ما هو الرقم الأولي التالي بعد ٧؟', options: ['٨', '٩', '١٠', '١١'], correctAnswer: 3 },
  { category: 'الرياضيات', question: 'كم زاوية يحتوي المربع؟', options: ['٢', '٣', '٤', '٥'], correctAnswer: 2 },
  { category: 'الرياضيات', question: 'ما هو ربع ١٠٠؟', options: ['٢٠', '٢٥', '٣٣', '٤٠'], correctAnswer: 1 },
  // Geography
  { category: 'الجغرافيا', question: 'ما هي عاصمة إنجلترا؟', options: ['باريس', 'روما', 'لندن', 'مدريد'], correctAnswer: 2 },
  { category: 'الجغرافيا', question: 'ما هو أكبر صحراء في العالم؟', options: ['صحراء العرب', 'صحراء غوبي', 'الصحراء الكبرى', 'صحراء أنتاركتيكا'], correctAnswer: 3 },
  { category: 'الجغرافيا', question: 'كم عدد دول مجلس التعاون الخليجي؟', options: ['٤', '٥', '٦', '٧'], correctAnswer: 2 },
  { category: 'الجغرافيا', question: 'على أي نهر تقع القاهرة؟', options: ['الفرات', 'دجلة', 'الأردن', 'النيل'], correctAnswer: 3 },
  { category: 'الجغرافيا', question: 'ما هي عاصمة تركيا؟', options: ['إسطنبول', 'إزمير', 'أنقرة', 'بورصة'], correctAnswer: 2 },
  // Animals
  { category: 'الحيوانات', question: 'كم عدد أرجل العنكبوت؟', options: ['٤', '٦', '٨', '١٠'], correctAnswer: 2 },
  { category: 'الحيوانات', question: 'ما هو أضخم حيوان بري على وجه الأرض؟', options: ['وحيد القرن', 'الفيل الأفريقي', 'أبقار البيسون', 'الفرس النهري'], correctAnswer: 1 },
  { category: 'الحيوانات', question: 'أي هذه الحيوانات يضع بيضًا؟', options: ['الكلب', 'الدلفين', 'البطة', 'الأرنب'], correctAnswer: 2 },
  { category: 'الحيوانات', question: 'ما اسم ذكر القط؟', options: ['الخروف', 'الهرة', 'السنّور', 'العلجوم'], correctAnswer: 2 },
  { category: 'الحيوانات', question: 'أي حيوان يُعرف بصوته الضحكة؟', options: ['الضبع', 'الثعلب', 'الذئب', 'القط'], correctAnswer: 0 },
  // History
  { category: 'التاريخ', question: 'من هو أول خليفة في الإسلام؟', options: ['عمر بن الخطاب', 'علي بن أبي طالب', 'أبو بكر الصديق', 'عثمان بن عفان'], correctAnswer: 2 },
  { category: 'التاريخ', question: 'أين وُلد النبي محمد ﷺ؟', options: ['المدينة المنورة', 'مكة المكرمة', 'الطائف', 'جدة'], correctAnswer: 1 },
  { category: 'التاريخ', question: 'ما اسم عاصمة الدولة العثمانية؟', options: ['بغداد', 'القاهرة', 'دمشق', 'إسطنبول'], correctAnswer: 3 },
  { category: 'التاريخ', question: 'متى كانت موقعة بدر الكبرى؟', options: ['٦٢٣م', '٦٢٤م', '٦٢٥م', '٦٢٦م'], correctAnswer: 1 },
  { category: 'التاريخ', question: 'من اخترع المصباح الكهربائي؟', options: ['غراهام بيل', 'توماس إديسون', 'نيكولا تسلا', 'ألبرت أينشتاين'], correctAnswer: 1 },
  // Sports
  { category: 'الرياضة', question: 'كم مرة فازت البرازيل بكأس العالم لكرة القدم؟', options: ['٣', '٤', '٥', '٦'], correctAnswer: 2 },
  { category: 'الرياضة', question: 'ما الرياضة التي يلعبها ليبرون جيمس؟', options: ['كرة القدم', 'كرة السلة', 'التنس', 'السباحة'], correctAnswer: 1 },
  { category: 'الرياضة', question: 'في أي رياضة يُستخدم المضرب والريشة؟', options: ['التنس', 'الاسكواش', 'البادمنتون', 'كرة الطاولة'], correctAnswer: 2 },
  { category: 'الرياضة', question: 'كم ضربة تسمى "هاتريك" في كرة القدم؟', options: ['٢', '٣', '٤', '٥'], correctAnswer: 1 },
  { category: 'الرياضة', question: 'ما عدد الأولمبيادات الصيفية حتى ٢٠٢٤م؟', options: ['٣٠', '٣٢', '٣٣', '٣٤'], correctAnswer: 2 },
  // General
  { category: 'معلومات عامة', question: 'ما هو مصدر الورق؟', options: ['البترول', 'الحديد', 'الأشجار', 'الرمل'], correctAnswer: 2 },
  { category: 'معلومات عامة', question: 'ما لون الدم في جسم الإنسان؟', options: ['أزرق', 'أحمر', 'أصفر', 'أخضر'], correctAnswer: 1 },
  { category: 'معلومات عامة', question: 'كم حاسة للإنسان؟', options: ['٣', '٤', '٥', '٦'], correctAnswer: 2 },
  { category: 'معلومات عامة', question: 'ما هي أسرع وسيلة نقل بشرية؟', options: ['السيارة', 'القطار', 'الطائرة', 'السفينة'], correctAnswer: 2 },
  { category: 'معلومات عامة', question: 'كم عدد أيام السنة الكبيسة؟', options: ['٣٦٣', '٣٦٤', '٣٦٥', '٣٦٦'], correctAnswer: 3 },
];

/**
 * Programmatically generate all 1000 questions (stages 1-50, 20 per stage).
 * Stages 1-3 use hand-crafted questions; stages 4-50 use the pool with
 * difficulty and points scaled by stage group.
 */
export const generateAllQuestions = () => {
  const allQuestions = [...stage1Questions, ...stage2Questions, ...stage3Questions];
  const pool = generatedQuestionsPool;
  const poolLen = pool.length;
  let id = 61;

  for (let stage = 4; stage <= 50; stage++) {
    let difficulty;
    let points;
    if (stage <= 10) {
      difficulty = 'easy'; points = 10;
    } else if (stage <= 30) {
      difficulty = 'medium'; points = 20;
    } else {
      difficulty = 'hard'; points = 30;
    }

    for (let q = 0; q < 20; q++) {
      const poolItem = pool[(id - 61 + q * 3) % poolLen];
      allQuestions.push({
        id,
        stage,
        difficulty,
        category: poolItem.category,
        points,
        question: `[مرحلة ${stage}] ${poolItem.question}`,
        options: poolItem.options,
        correctAnswer: poolItem.correctAnswer,
      });
      id++;
    }
  }

  return allQuestions;
};

/**
 * Return only the questions for a specific stage.
 */
export const getQuestionsForStage = (stage) => {
  if (stage <= 3) {
    const byStage = { 1: stage1Questions, 2: stage2Questions, 3: stage3Questions };
    return byStage[stage] || [];
  }
  return generateAllQuestions().filter(q => q.stage === stage);
};

const questions = [...stage1Questions, ...stage2Questions, ...stage3Questions];

export default questions;
