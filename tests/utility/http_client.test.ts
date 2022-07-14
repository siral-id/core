import { customFetch, Header } from "../../mod.ts";
import { assertEquals } from "https://deno.land/std@0.148.0/testing/asserts.ts";

Deno.test("not found", async () => {
  const response = await customFetch(
    {
      request: {
        url:
          "https://gist.githubusercontent.com/vousmeevoyez/fe55f6378aff2871f783f0707c16cce7/raw/6cf6f6cbde20b51016236bf341ca541da8a599c71/sample.json",
      },
    },
  );
  assertEquals(response.status, 404);
  assertEquals(response.body, "404: Not Found");
});

Deno.test("chunk", async () => {
  const response = await customFetch(
    {
      request: {
        url: "https://github.com/",
      },
    },
  );
  assertEquals(response.status, 200);
  assertEquals(response.headers.get(Header.TRANSFER_ENCODING), "chunked");
});
