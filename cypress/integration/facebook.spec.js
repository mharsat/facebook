/// <reference types="cypress" />
import { members } from "../fixtures/8000";

const findMember = (member) => {
  cy.get(".a8c37x1j > .oajrlxb2")
    .eq(0)
    .click({ force: true })
    .type(`${member}`, { delay: 0 })
    .wait(200)
    .type("{enter}");
  cy.wait(2000);
  cy.get(".a8c37x1j > div.nc684nl6 > .oajrlxb2 > span")
    .eq(0)
    .click({ force: true });
};

const findMember2 = (member) => {
  cy.get("[data-testid=search_input]")
    .eq(0)
    .clear()
    .click({ force: true })
    .type(`${member}{enter}`, { delay: 0 });
  cy.scrollTo(0, 500);
  cy.get(`[href='https://www.facebook.com/${member}']`)
    .eq(0)
    .click({ force: true });
};

const login = () => {
  cy.get("[data-testid=royal_email]")
    .invoke("val", "matanhp@yahoo.com")
    .trigger("input");
  cy.get("[data-testid=royal_pass]").invoke("val", "EsBZ9S1E").trigger("input");
  cy.get("[data-testid=royal_login_button]").click({ force: true });
};

const posts = {};

context("facebook", () => {
  before(() => {
    cy.visit(`https://www.facebook.com/m.harsat`);
    login();
  });
  members.forEach((member, index) => {
    it(member, () => {
      // findMember2(member);
      // cy.server();
      // cy.route("/ajax/bootloader-endpoint/*").as("ajax");
      cy.visit(`https://www.facebook.com/${member}`);
      login();
      // cy.wait("@ajax");
      // cy.get(".rq0escxv > .lpgh02oy");
      // cy.get(".l9j0dhe7.sjgh65i0").eq(0);
      // cy.get(".l9j0dhe7.sjgh65i0")
      cy.get("._1dwg._1w_m._q7o").eq(0);
      cy.get("._1dwg._1w_m._q7o")
        .invoke("text")
        .then((text) => {
          cy.get(".timestampContent")
            .eq(0)
            .invoke("text")
            .then((time) => {
              if (
                (text.includes("דירה") ||
                  text.includes("דירת") ||
                  text.includes("חדר") ||
                  text.includes("room")) &&
                (time.includes("August") ||
                  time.includes("September") ||
                  time.endsWith("d") ||
                  time.endsWith("h") ||
                  time.endsWith("m") ||
                  time.endsWith("s")) &&
                !time.includes(",")
              ) {
                posts[member] = {
                  time,
                  url: `https://www.facebook.com/${member}`,
                  text,
                };
              } else {
                posts[member] = null;
              }
            });
        });
      if (index % 20 === 0) {
        cy.writeFile("posts/posts.json", posts);
        cy.exec("surge posts fb-dirot-posts-1745139jxd3ur.surge.sh");
      }
    });
  });
});
