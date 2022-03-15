/*
/// <reference path="./base-components.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../state/project-state.ts"/>
/// <reference path="../models/project.ts"/>
/ <reference path="../models/drag-drop.ts"/>*/ //imports using TS
import { Draggable } from "../models/drag-drop.js";
import { Component } from "./base-components.js";
import { Project } from "../models/project.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

//ProjectItem Class

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;
  projectCTA: HTMLButtonElement;

  get countPeople() {
    if (this.project.people === 1) {
      return "1 person assigned";
    }
    return `${this.project.people} persons assigned`;
  }

  constructor(hostId: string, prjct: Project) {
    super("single-project", hostId, false, prjct.id);
    this.project = prjct;
    this.projectCTA = this.element.querySelector("button") as HTMLButtonElement;
    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }
  @AutoBind
  dragEndHandler(_event: DragEvent): void {
    const listEl = document.getElementsByTagName("ul") as HTMLCollection;

    for (let i = 0; i < listEl.length; i++) {
      listEl[i].classList.remove("droppable");
    }
  }

  @AutoBind
  deleteProject(event: Event) {
    event.preventDefault();
    projectState.deleteProject(this.project.id);
  }

  configure() {
    this.projectCTA.addEventListener("click", this.deleteProject);
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector(
      "h2"
    )!.innerText = `Project Title: ${this.project.title}`;
    this.element.querySelector("h3")!.innerText = this.countPeople;
    this.element.querySelector(
      "p"
    )!.innerText = `Project description: ${this.project.description}`;
  }
}
