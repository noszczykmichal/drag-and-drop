//Project Type

namespace App{
    export enum ProjectStatus {
        Active,
        Finished,
      }
    
      export class Project {
        id: string;
    
        constructor(
          public title: string,
          public description: string,
          public people: number,
          public status: ProjectStatus = ProjectStatus.Active //by default every is Active
        ) {
          this.id = Math.random().toString();
        }
      }
}

