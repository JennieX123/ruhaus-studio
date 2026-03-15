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
        intro: "An AI-powered wearable ecosystem designed for neurodivergent children aged 6–12, providing a critical window for behavioral support.",
        image: "/soma-logo.png",
        tags: ["ASD", "IDENTITY"]
      },
      {
        slug: "galaxsync",
        title: "Galaxsync",
        domain: "#Data #Sci-Fi",
        intro: "Real-time data synchronization visualizer crossing vast digital distances.",
        image: "/galaxsync-logo-original.png",
        tags: ["DATA VIZ", "SYSTEMS"]
      },
      {
        slug: "hear-me",
        title: "Hear Me",
        domain: "#Audio #Voice",
        intro: "Next-gen voice interfaces and immersive auditory experiences for creative professionals.",
        image: "/assets/images/project-hearme.png",
        tags: ["AI", "VOICE UX", "NEW"]
      },
      {
        slug: "yoyo",
        title: "YOYO",
        domain: "#Play #Interactive",
        intro: "Whimsical digital toys and interactive playgrounds that bring joy to daily routines.",
        image: "/assets/images/project-yoyo.png",
        tags: ["PRODUCT", "INTERACTIVE"]
      },
      {
        slug: "learno",
        title: "LEARNO",
        domain: "#EdTech #Learning",
        intro: "Structured and beautiful educational platforms designed for the curious mind.",
        image: "/assets/images/project-learno.png",
        tags: ["EDTECH", "UX DESIGN"]
      },
      {
        slug: "lumina",
        title: "Lumina",
        domain: "#SmartHome #IoT",
        intro: "Ambient computing and intelligent lighting systems blending seamlessly into spaces.",
        image: "/assets/images/project-lumina.png",
        tags: ["IOT", "AMBIENT"]
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
