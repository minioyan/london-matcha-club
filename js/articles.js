/*
 * Journal articles.
 *
 * 記事を追加する方法:
 *   下の配列に1つオブジェクトを追記するだけ。配列の先頭が「最新記事」として
 *   ホーム/Journalページのトップ(featured)に表示されます。
 *   日付の新しい順に並べてください（自動並び替えはしません）。
 *
 * 各フィールド:
 *   slug      : URL用の一意なID（英数字とハイフンのみ）。記事の永続リンクに使う。
 *   date      : { en: 'June 2025', ja: '2025年6月' } 表示用の文字列。
 *   gradient  : カード/カバー画像のプレースホルダー色（CSS linear-gradient）。
 *               実画像に差し替える場合は image フィールドにURLを入れる（gradientより優先）。
 *   image     : (省略可) 実画像のURL。指定するとgradientの代わりに使われる。
 *   title     : { en, ja } 見出し。
 *   excerpt   : { en, ja } 一覧用の要約（1〜2文）。
 *   body      : { en, ja } 本文。HTML文字列。<p>...</p> で段落を区切る。
 */

const ARTICLES = [
  {
    slug: 'first-bowl-sets-the-day',
    date: { en: 'June 2025', ja: '2025年6月' },
    gradient: 'linear-gradient(135deg,#3d5c3a,#5a7a55)',
    image: 'assets/journal/first-bowl.jpg',
    title: {
      en: 'On moving slowly — and why the first bowl sets the day',
      ja: 'ゆっくりと動くことについて — なぜ最初の一杯が1日を決めるのか',
    },
    excerpt: {
      en: 'Kenji has brewed matcha every morning for seven years. Not once has he rushed.',
      ja: '健二は7年間、毎朝抹茶を淹れてきた。急いだことは一度もない。',
    },
    body: {
      en: `<p>Kenji has brewed matcha every morning for seven years. Not once has he rushed.</p>
<p>Here, he explains why the pace of the preparation matters as much as the quality of the leaf — and why the first bowl of the day is for no one but himself.</p>
<p>"If you rush the whisking, you taste it. The matcha turns bitter, the foam goes flat. It's the same with most things — the rushing is what you taste."</p>`,
      ja: `<p>健二は7年間、毎朝抹茶を淹れてきた。急いだことは一度もない。</p>
<p>ここで彼は、準備のリズムが茶葉の質と同じくらい大切な理由、そして1日の最初の一杯が自分だけのものである理由を語る。</p>
<p>「茶筅を急ぐと、味でわかる。抹茶が苦くなり、泡が消えてしまう。多くのことがそうだ — 急いだことは、結局味になって出る。」</p>`,
    },
  },
  {
    slug: 'uji-nishio-yame-matcha-regions',
    date: { en: 'May 2025', ja: '2025年5月' },
    gradient: 'linear-gradient(135deg,#c8c2b5,#a8a298)',
    image: 'assets/journal/uji-nishio-yame.jpg',
    title: {
      en: "Uji, Nishio, Yame — a guide to Japan's matcha regions",
      ja: '宇治、西尾、八女 — 日本の抹茶産地ガイド',
    },
    excerpt: {
      en: "Three prefectures, three entirely different cups. Here's how to taste the difference.",
      ja: '3つの産地、3つのまったく異なる味。その違いを感じる方法。',
    },
    body: {
      en: `<p>Three prefectures, three entirely different cups. Here's how to taste the difference, and which to choose for what.</p>
<p>Uji produces the most refined, umami-forward matcha — the benchmark for ceremonial grade. Nishio leans grassier and brighter. Yame, in Fukuoka, sits somewhere in between, with a rounder, sweeter finish.</p>
<p>We rotate all three through the bar depending on the season and how the most recent harvest tastes.</p>`,
      ja: `<p>3つの産地、3つのまったく異なる味。その違いの感じ方と、場面による選び方。</p>
<p>宇治は最も洗練された旨味のある抹茶を生み出し、点茶用の基準とされる。西尾はより青々として明るい風味。福岡の八女はその中間で、丸みのある甘い後味が特徴。</p>
<p>季節や直近の収穫の出来によって、店ではこの3つを入れ替えながら提供している。</p>`,
    },
  },
  {
    slug: 'making-our-own-clothes',
    date: { en: 'April 2025', ja: '2025年4月' },
    gradient: 'linear-gradient(135deg,#e0dbd2,#ccc6bc)',
    image: 'assets/journal/making-clothes.jpg',
    title: {
      en: 'What we wear and why we started making it ourselves',
      ja: 'なぜ私たちは自分たちで服を作り始めたのか',
    },
    excerpt: {
      en: 'The LMC clothing line began with a single question: why does nothing fit the way we move?',
      ja: 'LMCのウェアは1つの問いから始まった。なぜ日々の動きに合う服がないのか。',
    },
    body: {
      en: `<p>The LMC clothing line began with a single question: why does nothing fit the way we actually move?</p>
<p>Every piece we make starts from the cafe floor — what's comfortable standing for ten hours, what doesn't show flour or matcha dust, what still looks considered at the end of a long shift.</p>
<p>Natural fibres only. Nothing synthetic, nothing seasonal.</p>`,
      ja: `<p>LMCのウェアラインは1つの問いから始まった。なぜ日々の動きに本当に合う服がないのか。</p>
<p>作るものはすべて、カフェの現場から発想している。10時間立ち続けても快適か、粉や抹茶の粉が目立たないか、長いシフトの終わりにもきちんと見えるか。</p>
<p>天然素材のみ。合成繊維も、季節限定品もない。</p>`,
    },
  },
  {
    slug: 'bonsai-in-our-window',
    date: { en: 'March 2025', ja: '2025年3月' },
    gradient: 'linear-gradient(135deg,#d4cec6,#b8b2a8)',
    image: 'assets/journal/bonsai.jpg',
    title: {
      en: 'The bonsai in our window — and what it has taught us about patience',
      ja: '窓の盆栽と、忍耐について教えてくれたもの',
    },
    excerpt: {
      en: "The pine has been in the shop since we opened. It's older than the business. We've learned more from it than from anything else.",
      ja: 'この松は開店以来ここにある。ブランドより古い。他の何よりも多くを教えてもらった。',
    },
    body: {
      en: `<p>The pine has been in the shop since we opened. It's older than the business. We've learned more from it than from anything else.</p>
<p>A bonsai can't be rushed into shape. You wire a branch, wait a season, and only then know if it worked. There is no shortcut, and we've stopped looking for one — here or anywhere else in the shop.</p>`,
      ja: `<p>この松は開店以来ここにある。ブランドより古い。他の何よりも多くを教えてもらった。</p>
<p>盆栽は無理に形を作ることができない。枝に針金をかけ、一季節待って、初めてうまくいったかどうかがわかる。近道はない。私たちはそれを、この店のどこでも探すのをやめた。</p>`,
    },
  },
  {
    slug: 'shade-time-21-days',
    date: { en: 'February 2025', ja: '2025年2月' },
    gradient: 'linear-gradient(135deg,#4a6b3a,#3a5530)',
    image: 'assets/journal/shade-time.jpg',
    title: {
      en: 'Shade time — why 21 days under cover makes a matcha exceptional',
      ja: '被覆期間 — なぜ21日間の遮光が抹茶を特別にするのか',
    },
    excerpt: {
      en: "The difference between ceremonial and culinary grade isn't just processing. It starts three weeks before harvest.",
      ja: '抹茶の上級品と一般品の違いは加工だけではない。それは収穫の3週間前から始まっている。',
    },
    body: {
      en: `<p>The difference between ceremonial and culinary grade isn't just processing. It starts three weeks before harvest.</p>
<p>Shading the tea bushes for 21 days before picking slows photosynthesis, boosting chlorophyll and amino acids — that's the source of matcha's sweetness and deep green colour. Skip the shade, and you get a flatter, more bitter leaf.</p>`,
      ja: `<p>抹茶の上級品と一般品の違いは加工だけではない。それは収穫の3週間前から始まっている。</p>
<p>収穫前21日間、茶樹を遮光することで光合成が抑えられ、クロロフィルとアミノ酸が増える。これが抹茶の甘みと深い緑色の理由だ。遮光をしないと、より平坦で苦みの強い茶葉になる。</p>`,
    },
  },
  {
    slug: 'linen-in-winter',
    date: { en: 'January 2025', ja: '2025年1月' },
    gradient: 'linear-gradient(135deg,#f0ede7,#ddd8ce)',
    image: 'assets/journal/linen-winter.jpg',
    title: {
      en: 'Linen in winter — why we wear the same things all year',
      ja: '冬のリネン — なぜ私たちは1年中同じものを着るのか',
    },
    excerpt: {
      en: 'The seasonal wardrobe myth. On why natural fibres are not seasonal, and why we stopped rotating entirely.',
      ja: '季節によるワードローブの神話。天然素材に季節はなく、私たちは入れ替えをやめた。',
    },
    body: {
      en: `<p>The seasonal wardrobe myth. On why natural fibres are not seasonal, and why we stopped rotating entirely.</p>
<p>Linen breathes in summer and insulates in winter when layered properly. The "seasonal capsule" is mostly a retail invention. We wear the same five pieces in December as we do in July.</p>`,
      ja: `<p>季節によるワードローブの神話。天然素材に季節はなく、私たちは入れ替えをやめた理由について。</p>
<p>リネンは夏は涼しく、適切に重ねれば冬も暖かい。「季節のカプセルワードローブ」は多くが小売側が作った発想にすぎない。私たちは12月も7月も、同じ5着を着ている。</p>`,
    },
  },
  {
    slug: 'notting-hill-morning-routine',
    date: { en: 'December 2024', ja: '2024年12月' },
    gradient: 'linear-gradient(135deg,#b5b0a6,#9a9590)',
    image: 'assets/journal/notting-hill.jpg',
    title: {
      en: "A Notting Hill morning — Kenji's routine before we open",
      ja: 'ノッティング・ヒルの朝 — 開店前の健二のルーティン',
    },
    excerpt: {
      en: 'Six forty-seven. The lights are off. The kettle is on. The first bowl is for no one but himself.',
      ja: '6時47分。照明はまだ消えている。ケトルに火が入った。最初の一杯は自分だけのもの。',
    },
    body: {
      en: `<p>Six forty-seven. The lights are off. The kettle is on. The first bowl is for no one but himself.</p>
<p>By the time the shop opens at eight, Kenji has already brewed three bowls, swept the floor twice, and changed nothing about the order he does either in.</p>`,
      ja: `<p>6時47分。照明はまだ消えている。ケトルに火が入った。最初の一杯は自分だけのもの。</p>
<p>8時に店を開ける頃には、健二はすでに3杯の抹茶を淹れ、床を2回掃いている。その順番は何年も変わらない。</p>`,
    },
  },
];

window.ARTICLES = ARTICLES;
