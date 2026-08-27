import { Questionnaire } from "@/types";

export const gd: Questionnaire = {
    id: "gd",
    title: "Gender Disforiyası Sorğusu (GDQ)",
    description: "Gender disforiyası təcrübələrinin və hisslərinin qiymətləndirilməsi",
    tags: ["Gender", "Kimlik", "Özünüqiymətləndirmə"],
    time: "10-15 dəqiqə",
    details: {
        introduction: "Gender Disforiyası Sorğusu gender kimliyi ilə bağlı təcrübə və hissləri qiymətləndirmək üçün nəzərdə tutulub. Gender disforiyası şəxsin yaşadığı və ya ifadə etdiyi gender ilə doğuşda təyin edilmiş gender arasındakı uyğunsuzluqla müşayiət oluna bilən narahatlığa işarə edir. Bu sorğu özünüdərketmə və təhsil məqsədi daşıyır. Zəhmət olmasa şəxsi təcrübə və hisslərinizə əsaslanaraq səmimi cavab verin.",
        questionCount: "27 sual",
        evaluationTime: "Təxminən 10-15 dəqiqə",
        instructions: "Zəhmət olmasa hər ifadəni diqqətlə oxuyun və təcrübənizi və ya hisslərinizi ən yaxşı təsvir edən cavabı seçin. Doğru və ya yanlış cavab yoxdur.",
        scoringMethod: [
            "Hər sual 1-dən 7-yə qədər ballandırılır (Razı deyiləm=1, Bir az razı deyiləm=2, Qismən razı deyiləm=3, Nə razıyam, nə də deyiləm=4, Qismən razıyam=5, Bir az razıyam=6, Razıyam=7)",
            "Ümumi bal aralığı: 27-189 bal",
            "Daha yüksək bal daha çox gender disforiyası təcrübəsini göstərə bilər",
            "Bu diaqnostik vasitə deyil və klinik diaqnoz üçün istifadə edilməməlidir"
        ],
        dimensions: [
            { name: "Gender Kimliyi", description: "Öz daxili gender hissi haqqında hisslər" },
            { name: "Sosial Gender Rolu", description: "Təyin edilmiş genderə əsaslanan sosial gözlənti və rollarla rahatlıq" },
            { name: "Fiziki Disforiya", description: "Fiziki xüsusiyyətlər və bədən haqqında hisslər" },
            { name: "Gender İfadəsi", description: "Genderi müxtəlif yollarla ifadə etməklə rahatlıq" }
        ],
        notes: [
            "Bu sorğu yalnız təhsil və özünüdərketmə məqsədi daşıyır",
            "Peşəkar qiymətləndirmə və ya diaqnozu əvəz etmir",
            "Gender kimliyi ilə bağlı narahatlıq yaşayırsınızsa, ixtisaslı psixi sağlamlıq mütəxəssisi ilə danışmağı düşünün",
            "Gender kimliyi mürəkkəb və şəxsi təcrübədir, insanlar arasında çox fərqlənir"
        ],
        references: [
            {
                text: "American Psychological Association. (2015). Guidelines for psychological practice with transgender and gender nonconforming people. American Psychologist, 70(9), 832-864.",
                url: "https://www.apa.org/practice/guidelines/transgender.pdf"
            }
        ]
    },
    questions: [
        { id: 1, content: "Doğuşda təyin edilmiş genderimlə özümü rahat hiss edirəm." },
        { id: 2, content: "Fərqli bir gendərdə doğulmuş olmağı arzulayıram." },
        { id: 3, content: "Bədənimin gender kimliyimə uyğun olduğunu hiss edirəm." },
        { id: 4, content: "Fərqli bir gender olmağı təsəvvür etmişəm." },
        { id: 5, content: "Təyin edilmiş genderim üçün nəzərdə tutulmuş tualetlərdən istifadə etməkdə özümü rahat hiss edirəm." },
        { id: 6, content: "İnsanlar məni təyin edilmiş genderimlə çağıranda özümü narahat hiss edirəm." },
        { id: 7, content: "Adətən təyin edilmiş genderimlə əlaqələndirilən fəaliyyətlərdən həzz alıram." },
        { id: 8, content: "Fərqli bir gender kimi görünəndə özümü daha rahat hiss edirəm." },
        { id: 9, content: "Hazırkı fiziki görünüşümdən məmnunam." },
        { id: 10, content: "Tibbi keçidi (hormonlar/əməliyyat) düşünmüşəm." },
        { id: 11, content: "Təyin edilmiş genderim üçün adi olan geyimləri geyinməkdə özümü rahat hiss edirəm." },
        { id: 12, content: "Başqalarının məni təyin edilmişdən fərqli bir gender kimi görməsini üstün tuturam." },
        { id: 13, content: "Bədənimdə özümü evimdəki kimi hiss edirəm." },
        { id: 14, content: "Fərqli gender ifadələrini sınamışam." },
        { id: 15, content: "Səsimlə bağlı özümü rahat hiss edirəm." },
        { id: 16, content: "Müəyyən fiziki xüsusiyyətlərimi dəyişdirmək istərdim." },
        { id: 17, content: "Təyin edilmiş genderimlə güclü şəkildə eyniləşirəm." },
        { id: 18, content: "Fərqli gendərdən olan insanlara qarşı qısqanclıq hiss etmişəm." },
        { id: 19, content: "Başqalarının genderimi necə qavradığından razıyam." },
        { id: 20, content: "Uşaqlıqdan bəri təyin edilmiş genderimdən qoparılmış hiss etmişəm." },
        { id: 21, content: "Təyin edilmiş genderim üçün ayrılmış yalnız bir cinsə aid məkanlarda özümü rahat hiss edirəm." },
        { id: 22, content: "Fərqli bir gender kimi oyanmağı arzulamışam." },
        { id: 23, content: "Gender kimliyimin sabit və ardıcıl olduğunu hiss edirəm." },
        { id: 24, content: "Gender kimliyimlə bağlı çaşqınlıq hiss etmişəm." },
        { id: 25, content: "Adım və əvəzliklərimlə özümü rahat hiss edirəm." },
        { id: 26, content: "Gender gözləntiləri ilə bağlı narahatlıq yaşamışam." },
        { id: 27, content: "Həqiqi gender kimliyimi ifadə edərkən özümü səmimi hiss edirəm." }
    ],
    renderOptions: (id: number) => {
        return [
            { id: 1, content: 'Razı deyiləm', value: '1' },
            { id: 2, content: 'Bir az razı deyiləm', value: '2' },
            { id: 3, content: 'Qismən razı deyiləm', value: '3' },
            { id: 4, content: 'Nə razıyam, nə də deyiləm', value: '4' },
            { id: 5, content: 'Qismən razıyam', value: '5' },
            { id: 6, content: 'Bir az razıyam', value: '6' },
            { id: 7, content: 'Razıyam', value: '7' },
        ];
    }
};
