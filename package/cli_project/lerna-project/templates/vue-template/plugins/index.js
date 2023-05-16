export default async function (api) {
  const mode = await api.makeList({
    choices: [
      {
        name: "默认",
        value: "default",
      },
      {
        name: "API",
        value: "api",
      },
    ],
    message: "请选择代码模式",
  });

  return {
    mode,
  };
}