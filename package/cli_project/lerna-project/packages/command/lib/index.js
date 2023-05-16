class Command {
  constructor(instance) {
    if (!instance) {
      throw new Error("command instance must not be null");
    }

    this.program = instance;
    const cmd = this.program.command(this.command);
    cmd.description(this.description);

    // 命令执行之前的钩子
    cmd.hook("preAction", () => {
      this.preAction();
    });

    // 命令执行之后的钩子
    cmd.hook("postAction", () => {
      this.postAction();
    });

    if (this.options?.length) {
      this.options.forEach((option) => cmd.option(...option));
    }
    cmd.action((...params) => {
      this.action(params);
    });
  }

  get command() {
    throw new Error("command must not be implements");
  }

  get description() {
    throw new Error("description must not be implements");
  }

  get options() {
    return [];
  }

  get action() {
    throw new Error("action must not be implements");
  }

  preAction() {
  }

  postAction() {
  }
}

export default Command;
