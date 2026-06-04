/**
 * GameVerse — MongoDB / Mongoose schema blueprint.
 *
 * This folder is a reference for the production backend and is intentionally
 * EXCLUDED from the Next.js app's tsconfig (see /tsconfig.json "exclude").
 * To use it:
 *   1) npm install mongoose
 *   2) Move these models into your API service (or Next route handlers under /src/app/api)
 *   3) Connect with the `connectDb` helper and replace the mock functions in
 *      /src/lib/queries.ts with real queries.
 *
 * The fields mirror /src/lib/types.ts so the frontend contract stays stable.
 */
import mongoose, { Schema, model, models, type Document } from 'mongoose';

let cached: typeof mongoose | null = null;

/** Connection helper safe for serverless (caches across invocations). */
export async function connectDb(uri = process.env.MONGODB_URI as string) {
  if (cached) return cached;
  if (!uri) throw new Error('MONGODB_URI is not set');
  cached = await mongoose.connect(uri, { dbName: 'gameverse' });
  return cached;
}

/* ----------------------------- User ----------------------------- */
export interface IUser extends Document {
  email: string;
  username: string;
  provider: 'google' | 'guest';
  avatarGradient: string;
  level: number;
  xp: number;
  roles: ('user' | 'admin')[];
  favorites: mongoose.Types.ObjectId[];
  createdAt: Date;
}
const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true },
    username: { type: String, required: true, unique: true },
    provider: { type: String, enum: ['google', 'guest'], default: 'guest' },
    avatarGradient: { type: String, default: 'from-primary to-secondary' },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    roles: { type: [String], default: ['user'] },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  },
  { timestamps: true },
);

/* ----------------------------- Category ----------------------------- */
export interface ICategory extends Document {
  slug: string;
  name: string;
  icon: string;
  gradient: string;
  description: string;
}
const CategorySchema = new Schema<ICategory>({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  icon: String,
  gradient: String,
  description: String,
});

/* ----------------------------- Game ----------------------------- */
export interface IGame extends Document {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  instructions: string;
  controls: { keys: string; action: string }[];
  embedUrl: string;
  categories: string[];
  tags: string[];
  developer: string;
  orientation: 'landscape' | 'portrait' | 'both';
  icon: string;
  gradient: string;
  rating: number;
  ratingCount: number;
  plays: number;
  likes: number;
  featured: boolean;
  trending: boolean;
  trendingScore: number;
  status: 'draft' | 'published' | 'archived';
  releasedAt: Date;
}
const GameSchema = new Schema<IGame>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, index: 'text' },
    tagline: String,
    description: String,
    instructions: String,
    controls: [{ keys: String, action: String }],
    embedUrl: { type: String, required: true },
    categories: { type: [String], index: true },
    tags: { type: [String], index: true },
    developer: String,
    orientation: { type: String, enum: ['landscape', 'portrait', 'both'], default: 'both' },
    icon: String,
    gradient: String,
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    plays: { type: Number, default: 0, index: true },
    likes: { type: Number, default: 0 },
    featured: { type: Boolean, default: false, index: true },
    trending: { type: Boolean, default: false, index: true },
    trendingScore: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
    releasedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);
GameSchema.index({ title: 'text', tags: 'text', tagline: 'text' });

/* ----------------------------- Score ----------------------------- */
const ScoreSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    game: { type: Schema.Types.ObjectId, ref: 'Game', index: true },
    value: { type: Number, required: true },
  },
  { timestamps: true },
);
ScoreSchema.index({ game: 1, value: -1 });

/* ----------------------------- Review ----------------------------- */
const ReviewSchema = new Schema(
  {
    game: { type: Schema.Types.ObjectId, ref: 'Game', index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5, required: true },
    body: String,
    helpful: { type: Number, default: 0 },
  },
  { timestamps: true },
);

/* ----------------------------- Achievement ----------------------------- */
const AchievementSchema = new Schema({
  key: { type: String, unique: true },
  name: String,
  description: String,
  icon: String,
  points: { type: Number, default: 10 },
});

/* ----------------------------- Favorite / Notification / Ad ----------------------------- */
const FavoriteSchema = new Schema(
  { user: { type: Schema.Types.ObjectId, ref: 'User' }, game: { type: Schema.Types.ObjectId, ref: 'Game' } },
  { timestamps: true },
);
FavoriteSchema.index({ user: 1, game: 1 }, { unique: true });

const NotificationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    type: String,
    title: String,
    body: String,
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const AdvertisementSchema = new Schema(
  {
    name: String,
    placement: { type: String, enum: ['header', 'sidebar', 'in-content', 'footer', 'rewarded'] },
    adClient: String,
    adSlot: String,
    active: { type: Boolean, default: true },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true },
);

/* Re-use compiled models across hot reloads / serverless invocations. */
export const User = models.User || model<IUser>('User', UserSchema);
export const Category = models.Category || model<ICategory>('Category', CategorySchema);
export const Game = models.Game || model<IGame>('Game', GameSchema);
export const Score = models.Score || model('Score', ScoreSchema);
export const Review = models.Review || model('Review', ReviewSchema);
export const Achievement = models.Achievement || model('Achievement', AchievementSchema);
export const Favorite = models.Favorite || model('Favorite', FavoriteSchema);
export const Notification = models.Notification || model('Notification', NotificationSchema);
export const Advertisement = models.Advertisement || model('Advertisement', AdvertisementSchema);
