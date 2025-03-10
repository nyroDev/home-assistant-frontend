import {
  GraphicType,
  ListItemBase,
} from "@material/mwc-list/mwc-list-item-base";
import { styles } from "@material/mwc-list/mwc-list-item.css";
import { mdiCloudOutline, mdiCodeBraces, mdiPackageVariant } from "@mdi/js";
import { css, CSSResultGroup, html } from "lit";
import { classMap } from "lit/directives/class-map";
import { customElement, property } from "lit/decorators";
import { domainToName } from "../../../data/integration";
import { HomeAssistant } from "../../../types";
import { brandsUrl } from "../../../util/brands-url";
import { IntegrationListItem } from "./dialog-add-integration";

@customElement("ha-integration-list-item")
export class HaIntegrationListItem extends ListItemBase {
  public hass!: HomeAssistant;

  @property({ attribute: false }) public integration?: IntegrationListItem;

  @property({ type: String, reflect: true }) graphic: GraphicType = "medium";

  @property({ type: Boolean }) hasMeta = true;

  renderSingleLine() {
    if (!this.integration) {
      return html``;
    }
    return html`${this.integration.name ||
    domainToName(this.hass.localize, this.integration.domain)}
    ${this.integration.is_helper ? " (helper)" : ""}`;
  }

  protected renderGraphic() {
    if (!this.integration) {
      return html``;
    }
    const graphicClasses = {
      multi: this.multipleGraphics,
    };

    return html` <span
      class="mdc-deprecated-list-item__graphic material-icons ${classMap(
        graphicClasses
      )}"
    >
      <img
        loading="lazy"
        src=${brandsUrl({
          domain: this.integration.domain,
          type: "icon",
          useFallback: true,
          darkOptimized: this.hass.themes?.darkMode,
        })}
        referrerpolicy="no-referrer"
      />
    </span>`;
  }

  protected renderMeta() {
    if (!this.integration) {
      return html``;
    }
    return html`<span class="mdc-deprecated-list-item__meta material-icons">
      ${!this.integration.config_flow &&
      !this.integration.integrations &&
      !this.integration.iot_standards
        ? html`<span
            ><ha-svg-icon .path=${mdiCodeBraces}></ha-svg-icon
            ><paper-tooltip animation-delay="0" position="left"
              >${this.hass.localize(
                "ui.panel.config.integrations.config_entry.yaml_only"
              )}</paper-tooltip
            ></span
          >`
        : ""}
      ${this.integration.cloud
        ? html`<span
            ><ha-svg-icon .path=${mdiCloudOutline}></ha-svg-icon
            ><paper-tooltip animation-delay="0" position="left"
              >${this.hass.localize(
                "ui.panel.config.integrations.config_entry.depends_on_cloud"
              )}</paper-tooltip
            ></span
          >`
        : ""}
      ${!this.integration.is_built_in
        ? html`<span
            ><ha-svg-icon .path=${mdiPackageVariant}></ha-svg-icon
            ><paper-tooltip animation-delay="0" position="left"
              >${this.hass.localize(
                "ui.panel.config.integrations.config_entry.provided_by_custom_integration"
              )}</paper-tooltip
            ></span
          >`
        : ""}
      <ha-icon-next></ha-icon-next>
    </span>`;
  }

  static get styles(): CSSResultGroup {
    return [
      styles,
      css`
        :host {
          padding-left: var(--mdc-list-side-padding, 20px);
          padding-right: var(--mdc-list-side-padding, 20px);
        }
        :host([graphic="avatar"]:not([twoLine])),
        :host([graphic="icon"]:not([twoLine])) {
          height: 48px;
        }
        span.material-icons:first-of-type {
          margin-inline-start: 0px !important;
          margin-inline-end: var(
            --mdc-list-item-graphic-margin,
            16px
          ) !important;
          direction: var(--direction);
        }
        span.material-icons:last-of-type {
          margin-inline-start: auto !important;
          margin-inline-end: 0px !important;
          direction: var(--direction);
        }
        img {
          width: 40px;
          height: 40px;
        }
        .mdc-deprecated-list-item__meta {
          width: auto;
        }
        .mdc-deprecated-list-item__meta > * {
          margin-right: 8px;
        }
        .mdc-deprecated-list-item__meta > *:last-child {
          margin-right: 0px;
        }
        ha-icon-next {
          margin-right: 8px;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-integration-list-item": HaIntegrationListItem;
  }
}
