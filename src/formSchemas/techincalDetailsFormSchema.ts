import * as z from "zod";

const PLATFORM_PREFIXES: Record<string, RegExp> = {
  youtube: /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//,
  github: /^https:\/\/(www\.)?github\.com\//,
  linkedin: /^https:\/\/(www\.)?linkedin\.com\//,
  others: /^https:\/\//,
};

export const technicalDetailsSchema = z
  .object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters.")
      .max(32, "Title must be at most 32 characters."),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters.")
      .max(100, "Description must be at most 100 characters."),
    skills: z
      .array(z.string())
      .min(1, "Add at least one skill.")
      .max(20, "you can add up to just 20 skills"),

    links: z
      .array(
        z.object({
          link_type: z.enum(["youtube", "github", "linkedin", "others"], {
            error: "Please Select Valid Platform",
          }),
          link_url: z.url("Please Enter A valid URL"),
        }),
      )
      .min(1, "Add at least one Link.")
      .max(4, "You can add up to 4 Links."),
  })
  .superRefine((data, ctx) => {
    // check if each platform link has valid link to this platform
    data.links.forEach((linkItem, index) => {
      const prefix = PLATFORM_PREFIXES[linkItem.link_type];

      const message =
        linkItem.link_type === "others"
          ? "Must be a Valid URL"
          : `must be a Valid ${linkItem.link_type} url`;

      if (prefix && !prefix.test(linkItem.link_url)) {
        ctx.addIssue({
          code: "custom",
          message: message,
          path: ["links", index, "link_url"],
        });
      }
    });
  });
