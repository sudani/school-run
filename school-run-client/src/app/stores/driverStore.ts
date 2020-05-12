import { observable, action, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IDriver } from "../models/driver";
import agent from "../api/agent";

configure({ enforceActions: "always" });
export class DriverStore {
  @observable driverRegistry = new Map();
  @observable drivers: IDriver[] = [];
  @observable loadingInitial = false;
  @observable driver: IDriver | null = null;
  @observable submitting = false;
  @observable target = "";

  @action loadDrivers = async () => {
    this.loadingInitial = true;
    try {
      const drivers = await agent.Drivers.list();
      runInAction("loading drivers", () => {
        drivers.forEach((driver) => {
          // this.driverRegistry.set(driver.id, driver);
          this.drivers.push(driver);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load drivers error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadDriver = async (id: string) => {
    let driver = this.getDriver(id);
    if (driver) {
      this.driver = driver;
    } else {
      this.loadingInitial = false;
      try {
        driver = await agent.Drivers.details(id);
        runInAction("getting driver", () => {
          this.driver = driver;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("getting driver error", () => {
          this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  };

@action clearDriver = () => {
  this.driver = null;
}


  getDriver = (id: string) => {
    return this.driverRegistry.get(id);
  };

  @action createDriver = async (driver: IDriver) => {
    this.submitting = true;
    try {
      await agent.Drivers.create(driver);
      runInAction("create driver", () => {
        this.driverRegistry.set(driver.id, driver);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create driver error", () => {
        this.submitting = false;
      });

      console.log(error);
    }
  };

  @action editDriver = async (driver: IDriver) => {
    this.submitting = true;
    try {
      await agent.Drivers.update(driver);
      runInAction("editting driver", () => {
        this.driverRegistry.set(driver.id, driver);
        this.driver = driver;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("edit driver error", () => {
        this.submitting = false;
      });

      console.log(error);
    }
  };

  @action deleteDriver = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Drivers.delete(id);
      runInAction("delete driver", () => {
        this.driverRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete driver error", () => {
        this.submitting = false;
        this.target = "";
      });

      console.log(error);
    }
  };

  
}

export default createContext(new DriverStore());