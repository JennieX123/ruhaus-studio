import { type User, type InsertUser, type Project, type InsertProject } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private userId: number;
  private projectId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.userId = 1;
    this.projectId = 1;
    this.seedProjects();
  }

  private seedProjects() {
    const seedData: InsertProject[] = [
      {
        slug: "soma",
        title: "Soma",
        domain: "#Health #Wellness",
        intro: "An AI wearable ecosystem addressing self co-regulation in autism education.",
        image: "/soma-hero.jpg",
        tags: ["AI Wearable Ecosystem", "Smart Phone", "ASD"]
      },
      {
        slug: "galaxsync",
        title: "Galaxsync",
        domain: "#Data #Sci-Fi",
        intro: "A reciprocal AI-driven VR care ecosystem connecting elders and ADHD children through shared stories and interactive worlds.",
        image: "/galaxsync-hero.jpg",
        tags: ["Reciprocal AI-VR Ecosystem", "ADHD", "Elders"]
      },
      {
        slug: "hear-me",
        title: "Hear Me",
        domain: "#AI #Accessibility",
        intro: "An AI avatar assistant designed for deaf and non-vocal users, enabling natural communication.",
        image: "/hearme-hero.jpg",
        tags: ["AI", "VOICE UX", "NEW"]
      },
      {
        slug: "learno",
        title: "LEARNO",
        domain: "#EdTech #AI #Gamification",
        intro: "A next-generation K–12 learning ecosystem with AI-guided gamified journeys and emotional companions.",
        image: "/learno-hero.jpg",
        tags: ["EDTECH", "AI", "K-12"]
      },
      {
        slug: "yoyo",
        title: "YOYO",
        domain: "#AI #IoT #Child Wellness",
        intro: "An intelligent assistant ensuring a holistic approach to child development.",
        image: "/yoyo-hero.jpg",
        tags: ["AI", "IoT", "NEW"]
      },
    ];
    seedData.forEach(p => this.createProject(p));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(
      (project) => project.slug === slug,
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }
}

export const storage = new MemStorage();
