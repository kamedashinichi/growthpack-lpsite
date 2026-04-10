# 業界別ヒーロー画像生成プロンプト（Gemini Imagen 3）

## 共通設定
全プロンプトの末尾に以下を追加すること：
```
Vertical portrait orientation, 3:4 aspect ratio, photorealistic, natural soft lighting, Japanese setting, warm color tones, no text overlays, no logos, no UI elements, shallow depth of field, shot with 85mm lens
```

---

## アパレル

```
A Japanese female store staff member in her late 20s wearing a neat uniform, gently holding up a folded knit sweater to show a female customer in a modern minimalist fashion boutique. The store has clean white shelving with neatly folded clothes, warm ambient lighting, wooden fixtures. Both women are smiling naturally. The customer is holding a small shopping bag. Store interior feels high-end but approachable. Vertical portrait orientation, 3:4 aspect ratio, photorealistic, natural soft lighting, Japanese setting, warm color tones, no text overlays, no logos, no UI elements, shallow depth of field, shot with 85mm lens
```

---

## 飲食チェーン

```
A Japanese restaurant entrance scene, a friendly male staff member in his 30s wearing a clean apron and uniform, welcoming customers at the front counter with a warm smile. A small group of 2-3 customers can be seen waiting near the entrance. The interior shows wooden tables, warm pendant lighting, a cozy izakaya or family restaurant atmosphere. Staff is gesturing to guide customers to their seats. Vertical portrait orientation, 3:4 aspect ratio, photorealistic, natural soft lighting, Japanese setting, warm color tones, no text overlays, no logos, no UI elements, shallow depth of field, shot with 85mm lens
```

---

## ドラッグストア

```
A Japanese female pharmacy staff member in her 30s wearing a white coat and store uniform, standing behind a clean register counter, handing a paper bag to a female customer. The store background shows neatly organized shelves with health products, bright fluorescent lighting softened to feel warm. The customer looks satisfied and grateful. Clean, professional, approachable atmosphere. Vertical portrait orientation, 3:4 aspect ratio, photorealistic, natural soft lighting, Japanese setting, warm color tones, no text overlays, no logos, no UI elements, shallow depth of field, shot with 85mm lens
```

---

## 百貨店

```
A wide elegant Japanese department store atrium viewed from ground level, with a grand escalator in the center, well-dressed shoppers walking through. The interior has high ceilings with chandeliers, luxury brand display windows on each floor, polished marble floors. A female staff member in formal uniform is visible in the foreground. The atmosphere is upscale, spacious, and refined. Vertical portrait orientation, 3:4 aspect ratio, photorealistic, natural soft lighting, Japanese setting, warm color tones, no text overlays, no logos, no UI elements, shallow depth of field, shot with 85mm lens
```

---

## スーパー・ホームセンター

```
A Japanese supermarket checkout scene, a female cashier in her 40s wearing a store apron and cap, smiling while scanning groceries for a female customer in her 30s. The checkout counter is clean and organized. Behind them, bright wide store aisles with full product shelves are visible. The atmosphere is friendly, everyday, and familiar. Vertical portrait orientation, 3:4 aspect ratio, photorealistic, natural soft lighting, Japanese setting, warm color tones, no text overlays, no logos, no UI elements, shallow depth of field, shot with 85mm lens
```

---

## EC

```
A Japanese woman in her late 20s sitting comfortably on a sofa at home, smiling while browsing on her smartphone. Nearby are two or three brown cardboard delivery boxes, one of them open with tissue paper visible. She is wearing casual comfortable clothes. The room has natural window light, a clean modern Japanese apartment interior with plants and simple furniture. She looks happy and engaged with her purchase. Vertical portrait orientation, 3:4 aspect ratio, photorealistic, natural soft lighting, Japanese setting, warm color tones, no text overlays, no logos, no UI elements, shallow depth of field, shot with 85mm lens
```

---

## スポーツ・エンタメ

```
A vibrant Japanese baseball or soccer stadium scene during a daytime game, wide shot showing rows of enthusiastic fans in colorful team colors, cheering and waving flags. The stadium is filled to capacity, bright sunlight illuminating the crowd. A few fans in the foreground are clearly excited, some holding up foam hands or banners. The energy is festive and electric. Vertical portrait orientation, 3:4 aspect ratio, photorealistic, natural soft lighting, Japanese setting, warm color tones, no text overlays, no logos, no UI elements, shallow depth of field, shot with 85mm lens
```

---

## ホテル・宿泊

```
A Japanese female hotel front desk staff member in her late 20s wearing a clean formal uniform with a name tag, smiling warmly while welcoming a female guest in her 30s at the check-in counter of a modern upscale hotel. The guest looks relaxed, holding a small travel bag. The lobby behind them is bright and spacious with high ceilings, warm wooden interior accents, indoor plants, and soft natural light streaming through large windows. The atmosphere feels welcoming, calm, and refined. Vertical portrait orientation, 3:4 aspect ratio, photorealistic, natural soft lighting, Japanese setting, warm color tones, no text overlays, no logos, no UI elements, shallow depth of field, shot with 85mm lens
```

---

## 生成後のファイル命名規則

| 業界 | ファイル名 |
|------|----------|
| アパレル | `apparel-hero.png` |
| 飲食 | `food-hero.png` |
| ドラッグストア | `drugstore-hero.png` |
| 百貨店 | `department-hero.png` |
| スーパー・HC | `supermarket-hero.png` |
| EC | `ec-hero.png` |
| スポーツ | `sports-hero.png` |
| ホテル・宿泊 | `hotel-hero.png` |

生成した画像は `/public/images/` に配置してください。