import repoLink from "../../components/repo-link.js";

export default {
  title: "Transform HTTP Response",
  metaDescription: "Dynamically transform any page response at The Edge.",
  page: function () {
    return `
    <section>
      <h1>Transform responses</h1>
      <p>
        You can use Edge Functions to transform the content of an HTTP response. In this example, we transform the response of a request to <a href="/hello">/hello</a> with a <code>toUpperCase()</code> function, using the query parameter <code>method=transform</code>.
      </p>

      <pre><code>import { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // Look for the query parameter, and return if we don't find it
  if (url.searchParams.get("method") !== "transform") {
    return;
  }

  const response = await context.next();
  const text = await response.text();
  return new Response(text.toUpperCase(), response);
};
</code></pre>

  <p>This transform Edge Function is set up to run using the <code>method=transform</code> query parameter on any URL, using this entry in the netlify.toml file:</p>

    <pre><code>[[edge_functions]]
  function = "transform"
  path = "/*"</code></pre>
      <h2>See this in action</h2>
      <ul>
        <li><a href="/hello">View the original response from /hello</a> without a transform</li>
        <li>View the response from /hello <a href="/hello?method=transform">dynamically transformed with an Edge Function</a></li>
        <li>${repoLink("transform.ts")}</li>
      </ul>
    </section>
  `;
  },
};
