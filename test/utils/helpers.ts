export const findByResourceId = (resourceId: string) =>
  $(`android=new UiSelector().resourceId("${resourceId}")`);
export const findElementsByResourceId = (resourceId: string) =>
  $$(`android=new UiSelector().resourceId("${resourceId}")`);
export const findByText = (text: string) =>
  $(`android=new UiSelector().text("${text}")`);
export const findByXpath = (xpath: string) => $(`//${xpath}`);
export const getNextDayFormatted = (): string => {
  let nextDay = new Date();

  nextDay.setDate(nextDay.getDate() + 1);

  let month = (nextDay.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, so I add 1
  let day = (nextDay.getDate() + 1).toString().padStart(2, "0");
  let year = nextDay.getFullYear();

  return `${month}/${day}/${year}`;
};

export const clickElement = async (element: WebdriverIO.Element) => {
  await isElementVisible(element);
  await element.click();
};

export const isElementVisible = async (element: WebdriverIO.Element) => {
  await element.waitForDisplayed({
    timeout: 10000,
    timeoutMsg: "Element is not visible",
  });
};

export const enterText = async (
  element: WebdriverIO.Element,
  text: string | number
) => {
  await clickElement(element);
  await element.setValue(text);
};

export const validateElementText = async (
  element: WebdriverIO.Element,
  expectedText: string
): Promise<void> => {
  await isElementVisible(element);
  const actualText = await getElementText(element);
  await expect(actualText).toEqual(expectedText);
};

export const getElementText = async (
  element: WebdriverIO.Element
): Promise<string> => {
  await driver.waitUntil(async () => (await element.getText()).length > 1, {
    timeout: 15000,
    timeoutMsg: "Element text is not visible",
  });

  const elementText = await element.getText();
  return elementText;
};

export const navigateBackMultipleTimes = async (times: number) => {
  for (let i = 0; i < times; i++) {
    await driver.pause(3000);
    await driver.back();
  }
};
