const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const publicPath = `./public`
const wellKnownPath = `.well-known`
const schemaName = 'fursona'
const schemaJsonName = 'fursona.json'
const assetsOutputFolder = 'fursonas'

const defaultOptions = {
  siteUrl: null,
  relativePaths: false,
  jsonExtension: false,
  sonas: [],
}

exports.onPostBootstrap = async ({ reporter }, pluginOptions) => {
  const options = {
    ...defaultOptions,
    ...pluginOptions,
  }
  const { siteUrl, sonas, relativePaths, jsonExtension } = options;
  if (!siteUrl || !sonas) {
    reporter.panicOnBuild(`"siteUrl" and "sonas" options are required for gatsby-plugin-fursona`);
    return;
  }

  // Remove trailing slash from siteUrl
  const trimmedSiteUrl = siteUrl.replace(/\/$/, "");

  const assetsOutputPath = path.join(publicPath, assetsOutputFolder)

  // For each fursona, copy the avatar to the public directory and change the avatar path to the public path
  const fursonasOutput = await Promise.all(sonas.map(async (sona) => {
    let { avatar, ref } = sona;

    if ((avatar || ref) && !fs.existsSync(assetsOutputPath)) {
      await fs.promises.mkdir(assetsOutputPath, { recursive: true });
    }

    if (avatar) {
      const avatarFilename = crypto.createHash('md5').update(avatar).digest('hex') + path.extname(avatar);
      await fs.promises.copyFile(avatar, path.join(assetsOutputPath, path.basename(avatarFilename)));
      avatar = path.join(assetsOutputFolder, path.basename(avatarFilename));
    }

    if (ref) {
      const refFilename = crypto.createHash('md5').update(ref).digest('hex') + path.extname(ref);
      await fs.promises.copyFile(ref, path.join(assetsOutputPath, path.basename(refFilename)));
      ref = path.join(assetsOutputFolder, path.basename(refFilename));
    }

    return {
      ...sona,
      avatar: avatar ? (relativePaths ? `/${avatar}` : `${trimmedSiteUrl}/${avatar}`) : null,
      ref: ref ? (relativePaths ? `/${ref}` : `${trimmedSiteUrl}/${ref}`) : null,
    }
  }));

  const outputPath = path.join(publicPath, wellKnownPath, jsonExtension ? schemaJsonName : schemaName);
  const outputDir = path.dirname(outputPath)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify({ sonas: fursonasOutput }, null, 2));

  reporter.info(`Fursona data generated at ${outputPath}`);
};

exports.pluginOptionsSchema = ({ Joi }) => {
  // siteUrl is required only if relativePaths is false
  return Joi.object({
    siteUrl: Joi.string().uri().when('relativePaths', {
      is: false,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    jsonExtension: Joi.boolean().default(false),
    relativePaths: Joi.boolean().default(false),
    sonas: Joi.array()
      .items(
        Joi.object({
          name: Joi.string(),
          pronouns: Joi.string(),
          gender: Joi.string(),
          species: Joi.string(),
          description: Joi.string(),
          ref: Joi.string(),
          refAlt: Joi.string(),
          avatar: Joi.string(),
          avatarAlt: Joi.string(),
          age: Joi.number().integer(),
          birthdate: Joi.date().iso(),
          colors: Joi.array().items(Joi.string()),
        })
      )
      .required(),
  });
};


exports.onPreInit = () => console.log("gatsby-plugin-fursona: OwO what's this?")
