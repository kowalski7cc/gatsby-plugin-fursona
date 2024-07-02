# Gatsby Plugin Fursona

Easily generate and manage well-known fursona schema files and images for your static sites using this Gatsby plugin. Ideal for creating standardized, accessible fursona landing pages using modern frontend frameworks.

This project is based on the [fursona-schema](https://github.com/pyrox0/fursona-schema) by Pyrox, which provides schemas for `.well-known/fursona` and `.well-known/fursona.json` in JSON Schema and Cue formats. A website that parses and displays these schemas can be found at [fursona.gmem.ca](https://fursona.gmem.ca/), with its source code available at [well-known-fursona](https://git.sr.ht/~gmem/well-known-fursona), a small SvelteKit+Tailwind application deployed on Vercel to utilize their edge functions.

## Installation

Install the plugin using npm or yarn:

```bash
npm install gatsby-plugin-fursona
```

or

```bash
yarn add gatsby-plugin-fursona
```

## Configuration

Add the plugin to your `gatsby-config.js` file with the necessary options:

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-fursona`,
      options: {
        siteUrl: `https://your-site-url.com`, // Required if relativePaths is false
        relativePaths: false, // Use relative paths for assets
        jsonExtension: false, // Output schema as fursona.json instead of fursona
        sonas: [
          {
            name: 'Your Fursona Name',
            pronouns: 'They/Them',
            gender: 'Non-binary',
            species: 'Wolf-Dragon Hybrid',
            description: 'A vibrant pink and red cross between a dragon and a hyena.',
            ref: './path/to/your/ref.png',
            avatar: './path/to/your/avatar.png',
            age: 25,
            birthdate: '1970-01-01T00:00:00+00:00', // ISO format
            colors: [
              "#ff0000",
              "#0f0",
              "#00f"
            ],
          },
        ],
      },
    },
  ],
}
```

## Options

- `siteUrl` (string, required if `relativePaths` is false): The base URL of your site.
- `relativePaths` (boolean, default: false): Use relative paths for asset URLs.
- `jsonExtension` (boolean, default: false): Output schema as `fursona.json` instead of `fursona`.
- `sonas` (array, required): An array of fursona objects with the following properties:
  - `name` (string): Name of the fursona.
  - `pronouns` (string): Pronouns of the fursona.
  - `gender` (string): Gender of the fursona.
  - `species` (string): Species of the fursona.
  - `description` (string): Description of the fursona.
  - `ref` (string): Path to the reference image of the fursona.
  - `avatar` (string): Path to the avatar image of the fursona.
  - `age` (number): Age of the fursona.
  - `birthdate` (string, ISO date format): Birthdate of the fursona.
  - `colors` (array of strings): Colors associated with the fursona.

## Usage

After configuring the plugin, it will generate a `.well-known/fursona` file (or `.well-known/fursona.json` if `jsonExtension` is true) in the public directory of your Gatsby site. This file contains the fursona data in JSON format.

## Example

```json
{
  "sonas": [
    {
      "name": "Your Fursona Name",
      "pronouns": "They/Them",
      "gender": "Non-binary",
      "species": "Wolf-Dragon Hybrid",
      "description": "A vibrant pink and red cross between a dragon and a hyena.",
      "ref": "https://your-site-url.com/fursonas/your-ref-image.png",
      "avatar": "https://your-site-url.com/fursonas/your-avatar-image.png",
      "age": 25,
      "birthdate": "1970-01-01T00:00:00+00:00",
      "colors": [
        "#ff0000",
        "#0f0",
        "#00f"
      ]
    }
  ]
}
```

## Additional Information

This plugin copies the fursona reference and avatar images to the `public/fursonas` directory and updates their paths in the generated JSON file. Ensure the paths provided in the `sonas` array are correct and point to existing image files.

## Contribution

Feel free to open issues or submit pull requests for enhancements or bug fixes.

## License

This plugin is licensed under the 0BSD License.

---

Enjoy using the Gatsby Plugin Fursona! If you encounter any issues or have any questions, please reach out.