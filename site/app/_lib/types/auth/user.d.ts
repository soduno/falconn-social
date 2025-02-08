export interface UserProps {
  id: number;
  email: string;
  name: string | null;
  createdAt: string;
  activatedAt: string;
  userMeta: Array | null
}