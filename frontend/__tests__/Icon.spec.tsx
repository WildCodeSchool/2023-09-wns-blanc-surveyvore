import Icon, { ColorType } from "@/components/Icon/Icon";
import { IconName } from "@/types/iconName.type";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Icon", () => {
  it("should render correctly", () => {
    const icon = {
      name: "lock" as IconName,
      color: "primary" as ColorType,
    };

    render(<Icon name={icon.name} color={icon.color} />);

    const iconElement = document.querySelector("svg");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute("class", `icon--${icon.color}`);
  });
});

